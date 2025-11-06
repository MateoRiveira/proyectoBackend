import fs from "fs";
import crypto from "crypto";

export default class ProductManager {
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

  async getProducts() {
    return await this.#loadFile();
  }

  async getProductById(id) {
    const products = await this.#loadFile();
    
    return products.find((p) => String(p.id) === String(id)) || null;
  }

  async addProduct(product) {
    const products = await this.#loadFile();

    
    const required = ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"];
    for (const field of required) {
      if (product[field] === undefined) {
        throw new Error(`Falta el campo obligatorio: ${field}`);
      }
    }

    // Evitar duplicado por code
    if (products.some((p) => p.code === product.code)) {
      throw new Error("Ya existe un producto con ese code");
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: String(product.title),
      description: String(product.description),
      code: String(product.code),
      price: Number(product.price),
      status: Boolean(product.status),
      stock: Number(product.stock),
      category: String(product.category),
      thumbnails: Array.isArray(product.thumbnails) ? product.thumbnails.map(String) : []
    };

    products.push(newProduct);
    await this.#saveFile(products);
    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this.#loadFile();
    const idx = products.findIndex((p) => String(p.id) === String(id));
    if (idx === -1) return null;

    // Nunca permitir cambiar id
    const { id: _ignored, ...rest } = updates;
    const updated = { ...products[idx], ...rest, id: products[idx].id };

    // Asegurar tipos básicos
    if (updated.price !== undefined) updated.price = Number(updated.price);
    if (updated.stock !== undefined) updated.stock = Number(updated.stock);
    updated.status = Boolean(updated.status);

    products[idx] = updated;
    await this.#saveFile(products);
    return updated;
  }

  async deleteProduct(id) {
    const products = await this.#loadFile();
    const filtered = products.filter((p) => String(p.id) !== String(id));
    if (filtered.length === products.length) return false;
    await this.#saveFile(filtered);
    return true;
  }
}


