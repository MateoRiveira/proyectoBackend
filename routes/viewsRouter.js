
import { Router } from "express";
import { ProductModel } from "../models/product.js";
import { CartModel } from "../models/cart.js";
import ProductManager from "../products/productManager.js"


const router = Router();

router.get("/products", async (req, res) => {
  const products = await ProductModel.find().lean();
  res.render("index", { products });
});

router.get("/products/:pid", async (req, res) => {
  const product = await ProductModel.findById(req.params.pid).lean();
  res.render("productDetail", { product });
});

router.get("/carts/:cid", async (req, res) => {
  const cart = await CartModel.findById(req.params.cid)
    .populate("products.product")
    .lean();

  res.render("cart", { cart });
});

const manager = new ProductManager("./src/products/products.json");

//mostrar la lista de productos 
router.get("/", async (req, res) => {
    const products = await manager.getProducts();
    res.render("partials/home", {
        title: "Lista de productos",
        products,
    });
});

//mostrar productos en tiempo real
router.get("/realtimeproducts", async (req, res) => {
    const products = await manager.getProducts();
    res.render("partials/realTimeProducts", {
        title: "Productos en tiempo real",
        products,
        script: "/js/realtime.js"
    });
});

export default router;

