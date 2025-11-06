import express from "express";
import productsRouter from "./products/productRouter.js";
import cartsRouter from "./carts/cartRouter.js";


const app = express();

app.use(express.json());


app.use("/products", productsRouter);
app.use("/carts", cartsRouter);




const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/thumbnails", express.static("thumbnails"));




app.get("/", (req, res) => res.send("Funcionando"));


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export default app;