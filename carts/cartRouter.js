
import { Router } from "express";
import CartManager from "./cartManager.js";

const router = Router();
const manager = new CartManager("./data/carts.json");


router.post("/", async (req, res) => {
  try {
    const cart = await manager.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:cid", async (req, res) => {
  try {
    const cart = await manager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


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




