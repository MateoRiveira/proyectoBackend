import fs from "fs";
import crypto from "crypto";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async #loadFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async #saveFile(data) {
    await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async createCart() {
    const carts = await this.#loadFile();

    const newCart = {
      id: crypto.randomUUID(),
      products: []
    };

    carts.push(newCart);
    await this.#saveFile(carts);

    return newCart;
  }

  async getCartById(id) {
    const carts = await this.#loadFile();
    return carts.find(c => String(c.id) === String(id)) || null;
  }

  async addProductToCart(cid, pid) {
    const carts = await this.#loadFile();
    const cart = carts.find(c => String(c.id) === String(cid));

    if (!cart) return null;

    const existing = cart.products.find(p => p.product === pid);

    if (existing) {
      existing.quantity++;
    } else {
      cart.products.push({
        product: pid,
        quantity: 1
      });
    }

    await this.#saveFile(carts);

    return cart;
  }
}


