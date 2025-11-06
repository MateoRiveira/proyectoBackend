// app.js
import express from "express";
import productsRouter from "./products/productRouter.js";
import cartsRouter from "./carts/cartRouter.js";
import ProductManager from "./products/productManager.js";

const app = express();
const PORT = 8080;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/thumbnails", express.static("thumbnails"));


const productManager = new ProductManager("./data/products.json");
app.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: "Error al leer products.json" });
  }
});


app.use("/products", productsRouter);
app.use("/carts", cartsRouter);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
  

export default app;
