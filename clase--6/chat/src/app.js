/** CHAT COMUNITARIO **/

import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
const app = express(); 
const PUERTO = 8080;  


//Configuramos Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware 
app.use(express.static("./src/public"));

//Rutas
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})
//1) Me guardo una referencia del servidor. 

const io = new Server(httpServer);
//2) Creamos una instancia de socket.io pasadonle como parametro el servidor http. 

//3) Creamos un array para guardar los mensajes que se vayan enviando al chat. 
let messages = [];


io.on("connection", (socket) => {
    console.log("Un cliente conectado");

    socket.on("message", (data) => {
        //Recibo la data del cliente y lo voy a guardar
        messages.push(data);

        //Utilizamos el método emit que nos permite emitir eventos desde el servidor hacia el cliente: 
        io.emit("messagesLogs", messages);
    })
} )