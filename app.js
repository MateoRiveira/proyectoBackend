import express from "express";
import handlebars from 'express-handlebars';
import productRouter from "./products/productRouter.js";
import cartRouter from "./carts/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js"
import {Server} from "socket.io"
import http from "http"

const app = express();


app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars');
app.set('viewsRouter','./routes' )

app.use('/thumbnails', express.static('thumbnails'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use('/', viewsRouter) 

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    
    const productos = await manager.getProducts();
    socket.emit("productsUpdated", productos);

    
    socket.on("newProduct", async (data) => {
        await manager.addProduct(data);
        const listaActualizada = await manager.getProducts();
        io.emit("productsUpdated", listaActualizada);
    });

    
    socket.on("deleteProduct", async (id) => {
        await manager.deleteProduct(id);
        const listaActualizada = await manager.getProducts();
        io.emit("productsUpdated", listaActualizada);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});


const PORT = 8080;
server.listen(PORT, () =>
  console.log(`Servidor iniciado en http://localhost:${PORT}`)
);
