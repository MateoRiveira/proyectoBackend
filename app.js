import express from "express";
import productsRouter from "./products/productRouter.js";
import cartsRouter from "./carts/cartRouter.js";


const app = express();
// Middleware para leer JSON
app.use(express.json());

// RUTAS REALES SEGÚN TU ESTRUCTURA
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);




const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/thumbnails", express.static("thumbnails"));



// Ruta de prueba
app.get("/", (req, res) => res.send("Funcionando"));

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export default app;