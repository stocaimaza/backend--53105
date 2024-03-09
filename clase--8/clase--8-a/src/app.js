/** CLASE 8 - PRIMERA PARTE **/

//Temas de hoy: 

//1) Clientes de Base de datos. 
//2) MongoDB Atlas
//3) DBaas (Database as a service)
//4) Configuracion e instalacion de Mongoose
//5) CRUD en nuestra App. 

///////////////////////////////////////////

//Instalamos mongoose: npm install mongoose

import express from "express";
const app = express();
const PUERTO = 8080;
import clientesRouter from "./routes/clientes.router.js";
import "./database.js";

//require("./database.js"); common JS


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Rutas

app.use("/clientes", clientesRouter)

app.listen(PUERTO, ()=> {
    console.log(`Estamos conectados al puerto: ${PUERTO}`);
})

// //Nos conectamos con MongoAtlas 

// import mongoose from "mongoose";

// mongoose.connect("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/Tienda?retryWrites=true&w=majority&appName=Cluster0")
//     .then(() => console.log("Conectados a la BD, si miedo al exito"))
//     .catch(() => console.log("Todo mal, me paso a diseño de indumentaria"))


