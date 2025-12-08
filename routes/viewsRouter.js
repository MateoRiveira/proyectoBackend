import { Router } from "express";
import ProductManager from "../products/productManager";

const router = Router();
const manager = new ProductManager("./src/products/products.json");


router.get("/", async (req, res) => {
    const products = await manager.getProducts();
    res.render("home", {
        title: "Lista de productos",
        products,
    });
});

router.get("/realtimeproducts", async (req, res) => {
    const products = await manager.getProducts();
    res.render("realTimeProducts", {
        title: "Productos en tiempo real",
        products,
        script: "/js/realtime.js"
    });
});

export default router;

