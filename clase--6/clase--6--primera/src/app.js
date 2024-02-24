/** CLASE 6 - PRIMERA PARTE **/

//Temas de hoy: 

//1) Que es Websockets
//2) Instalamos y trabajamos con Socket.io

//Websocket es un protocolo de comunicación bidireccional en tiempo real. 

//La comunicación se realiza entre dos enpoints, y cada endpoint recibe el nombre de socket. 

//¿Cómo funciona? 

//1) El cliente tien que enviar una petición HTTP al servidor llamado handshake (apretón de manos). Este apretón de manos es un acuerdo entre el cliente y el servidor para establecer la conexión.

//2) A partir de este momento, la conexión es bidireccional. 

//Para poder trabajar con websockets vamos a instalar una depedencia llamada Socket.io

//instalamos: npm install socket.io

/////////////////////////////////////////////////////////

const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const viewsRouter = require("./routes/views.router.js");

//Middleware
app.use(express.static("./src/public"));

//Configuramos Express Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas 
app.use("/", viewsRouter);

//Listen

const httpServer =  app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO} `);
})

//Socket.io: 

//1) Guardar una referencia del servidor: 

const io = socket(httpServer);
//2) Configuramos socket.io

//Enviamos un array de usuarios para que el cliente lo reciba y lo pueda renderizar por pantalla en index.handlebars

const usuarios = [
    {id: 1, nombre: "Lionel", apellido: "Messi"},
    {id: 2, nombre: "Cristiano", apellido: "Ronaldo"},
    {id: 3, nombre: "Neymar", apellido: "JR"},
    {id: 4, nombre: "Tinki Winki", apellido: "Teletubbie"},
    {id: 5, nombre: "Lala", apellido: "Teletubbie"},
    {id: 6, nombre: "Dixi", apellido: "Teletubbie"},
    {id: 7, nombre: "Po", apellido: "Teletubbie"},
]


io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");

    //Voy a escuchar el evento "mensaje". 
    //Recuerden: con "emit" voy a emitir y con "on" voy a escuchar los mensajes. 

    socket.on("mensaje", (data) => {
        console.log(data);
    })

    //Ahora el servidor le va a enviar un mensaje al cliente:
    socket.emit("saludito", "Hola Cliente!, soy el servidor");

    //Enviamos un array de usuarios al cliente: 

    socket.emit("usuarios", usuarios);

})

