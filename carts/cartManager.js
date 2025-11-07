
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
    const newCart = { id: crypto.randomUUID(), products: [] };
    carts.push(newCart);
    await this.#saveFile(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.#loadFile();
    return carts.find((c) => String(c.id) === String(id)) || null;
  }

  async addProductToCart(cid, pid) {
    const carts = await this.#loadFile();
    const idx = carts.findIndex((c) => String(c.id) === String(cid));
    if (idx === -1) return null;

    const cart = carts[idx];
    const pIndex = cart.products.findIndex((p) => String(p.product) === String(pid));

    if (pIndex !== -1) {
      cart.products[pIndex].quantity = Number(cart.products[pIndex].quantity) + 1;
    } else {
      cart.products.push({ product: String(pid), quantity: 1 });
    }

    carts[idx] = cart;
    await this.#saveFile(carts);
    return cart;
  }
}



