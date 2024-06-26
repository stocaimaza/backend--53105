import express from "express";
const app = express();
const PUERTO = 8080; 
import "./database.js"
import jugueteRouter from "./routes/juguetes.router.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rutas
app.use("/juguetes", jugueteRouter);

//Listen
app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})
