import { Router } from "express";
import ProductManager from "../products/productManager.js"
const router = Router();
const manager = new ProductManager("./src/products/products.json");


router.get("/", async (req, res) => {
    const products = await manager.getProducts();
    res.render("partials/home", {
        title: "Lista de productos",
        products,
    });
});

router.get("/realtimeproducts", async (req, res) => {
    const products = await manager.getProducts();
    res.render("partials/realTimeProducts", {
        title: "Productos en tiempo real",
        products,
        script: "/js/realtime.js"
    });
});

export default router;

