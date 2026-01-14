const socket = io();


socket.on("productsUpdated", (products) => {
    const list = document.getElementById("productsList");
    list.innerHTML = "";

    // p = producto
    products.forEach((p) => {
        const li = document.createElement("li");
        li.id = p.id;
        li.textContent = `${p.title} — $${p.price}`;
        list.appendChild(li);
    });
});

//e = evento
document.getElementById("addForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const product = {
        title: e.target.title.value,
        price: e.target.price.value,
    };
    socket.emit("newProduct", product);
});

document.getElementById("deleteForm").addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("deleteProduct", e.target.id.value);
});
