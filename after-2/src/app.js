/** AFTER 2 - DESAFIO EXPRESS JS **/

const express = require("express");
const app = express();
const PUERTO = 8080;
const ProductManager = require("./controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");



//Middleware (lo vemos mañana!)
app.use(express.json());

//Rutas

//1) Listar los productos del archivo JSON: 

app.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();
        if (limit) {
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos)
        }
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
})

//2) Retornamos producto por ID: 

app.get("/products/:pid", async (req, res) => {
    try {
        let id = req.params.pid;
        const producto = await productManager.getProductById(parseInt(id));

        if(!producto) {
            return res.json({error: "ID no encontrado"});
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
})


//Listen del servidor

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO} `);
})