import { Router } from "express";
import CartManager from "./cartManager.js";

const router = Router();

// Ruta correcta hacia carts.json
const manager = new CartManager("../data/carts.json");

// POST /carts
router.post("/", async (req, res) => {
  try {
    const cart = await manager.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /carts/:cid
router.get("/:cid", async (req, res) => {
  try {
    const cart = await manager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /carts/:cid/product/:pid
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const updated = await manager.addProductToCart(req.params.cid, req.params.pid);
    if (!updated) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;



