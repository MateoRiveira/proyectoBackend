
import { Router } from "express";
import { CartModel } from "../models/cart.js";

const router = Router();

router.post("/", async (req, res) => {
  const cart = await CartModel.create({ products: [] });
  res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
  const cart = await CartModel.findById(req.params.cid).populate(
    "products.product"
  );
  res.json(cart);
});

router.delete("/:cid/products/:pid", async (req, res) => {
  await CartModel.updateOne(
    { _id: req.params.cid },
    { $pull: { products: { product: req.params.pid } } }
  );
  res.json({ message: "Producto eliminado del carrito" });
});

router.put("/:cid", async (req, res) => {
  await CartModel.updateOne(
    { _id: req.params.cid },
    { products: req.body.products }
  );
  res.json({ message: "Carrito actualizado" });
});

router.put("/:cid/products/:pid", async (req, res) => {
  await CartModel.updateOne(
    { _id: req.params.cid, "products.product": req.params.pid },
    { $set: { "products.$.quantity": req.body.quantity } }
  );
  res.json({ message: "Cantidad actualizada" });
});

router.delete("/:cid", async (req, res) => {
  await CartModel.updateOne(
    { _id: req.params.cid },
    { products: [] }
  );
  res.json({ message: "Carrito vaciado" });
});

export default router;