//MOCK: es una imitacion de un dato real. Es una simulacion que generamos en el entorno de desarrollo para no manipular datos reales. 

//FAKER_JS. 
//npm i @faker-js/faker

import express from "express";
const app = express(); 
const PUERTO = 8080;
import usuariosRouter from "./router/usuarios.router.js";

app.use("/", usuariosRouter);

app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})
