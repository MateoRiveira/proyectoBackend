import express from "express";
import productRouter from "./products/productRouter.js";
import cartRouter from "./carts/cartRouter.js";

const app = express();

app.use('/thumbnails', express.static('thumbnails'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);
app.use("/carts", cartRouter);


app.get("/", (req, res) => {
  res.send("Servidor funcionando ✅");
});


const PORT = 8080;
app.listen(PORT, () =>
  console.log(`Servidor iniciado en http://localhost:${PORT}`)
);
