/** CLASE 10 - PRIMERA PARTE  **/
//COOKIES Y SESSION

//Temas:

//1) Cookies. 
//2) Set, get, clear cookies. 
//3) Cookies firmadas. 
//4) Generamos sessions. 

//Las cookies son pequeños archivos de texto que viven en el navegador del usuario. 

//Esta información puede viajar entre las peticiones del cliente al servidor. 

//¿Que datos podemos guardar? 

//Nombres de usuario
//Preferencias del usuario
//Id de las sessions


//Caracteristicas: 

//. Se les puede configurar un tiempo de vida. 
//. Este archivito se almacena del lado del cliente, en el navegador, por lo tanto el espacio para almacenar es limitado. 
//. Podemos darle un poco de seguridad con claves. 
//. Cuidado! No podemos guardar datos sensibles. 

//instalamos: npm i cookie-parser

//SESSIONS: 

//Generamos Sesiones: esto nos permite conseguir un almacenamiento de información del cliente en el servidor. Lo podemos trabajar desde el objeto req.session. 

//Caracteristicas: 
//A) La información qeu se quiere guardar se almacena del lado del servidor. 
//B) Del lado del cliente se crea un identificador único para acceder a esa información. 
//C) Los datos almacenados en session se borrar al cerrar el servidor. 
//D) Lo usamos principalmente para guardar datos de usuario al iniciar sesión. 

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore  from "session-file-store";
import MongoStore from "connect-mongo";
const fileStore = FileStore(session);
import exphbs from "express-handlebars";
const app = express(); 
const PUERTO = 8080; 
import "./database.js";

//Middleware
//app.use(cookieParser());
const miAltaClaveSecreta = "TinkiWinki";
app.use(cookieParser(miAltaClaveSecreta));
//Le paso la palabra secreta al middleware de Cookie Parser. 

//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware de Session: 
app.use(session({
    secret:"secretCoder",
    resave: true,
    //Esta configuración me permite mantener activa la sesion frente a la inactividad del usuario. 

    saveUninitialized: true,
    //Me permite guardar cualquier sesión aun cuando el objeto de sesion no tenga nada para contener. 

    //2) Utilizando el File Storage: 
    //store: new fileStore({path: "./src/sessions", ttl: 100000, retries:1})
    //path: la ruta en donde se van a guardar los archivitos de sesiones. 
    //ttl: Time To Live ( en segundos lo colocamos)
    //retries: cantidad de veces que el servidor tratara de leer el archivo. 

    //3)Utilizando Mongo Store
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })
}))

//Rutas
app.get("/", (req, res) => {
    res.send("funciona!");
})



//Listen
app.listen(PUERTO, ()=> {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})

//Setear una cookie: 

// app.get("/setcookie", (req, res) => {
//     Usamos el objeto "res" para asignarle la cookie al cliente. 
//     res.cookie("coderCookie", "Mi primera chamba con cookies").send("Cookie seteada!");
//     Recuerden que las guardamos en formato "clave- valor". 
//     Esta cookie vive hasta que es eliminada. Si yo quiero que tenga un tiempo de vida limitado puedo hacer los siguiente:
//     res.cookie("coderCookie", "Mi primera chamba con cookies", {maxAge: 4000}).send("Cookie seteada!");
// })

// Leer el valor de una Cookie: 
// app.get("/leercookie", (req, res) => {
//     res.send(req.cookies)
// })

// Borramos una cookie. 
// app.get("/borrarcookie", (req, res) => {
//     res.clearCookie("coderCookie").send("Cookie Eliminada!");
//     res.clearCookie("cookieFirmada").send("Cookie Eliminada!");
//     ¿Cómo borro todas las cookies? 
//     No tenemos método directo, tenemos que iterar: 
//     for(let cookie in req.cookies) {
//         res.clearCookie(cookie);
//     }
//     res.send('Todas las cookies han sido eliminadas');

// })

// Enviar una cookie firmada: 

// app.get("/cookiefirmada", (req, res) => {
//     res.cookie("cookieFirmada", "Esto es un mensaje secreto", {signed: true}).send("Cookie firmada enviada");
// })

// Obtenemos una cookie firmada: 
// app.get("/recuperamoscookiefirmada", (req, res) => {
//     Ahora para recuperar las cookies firmadas tengo que utilizar: 
//     req.signedCookies

//     const valorCookie = req.signedCookies.cookieFirmada; 
//     if(valorCookie) {
//         res.send("Cookie recuperada: " + valorCookie);
//     } else {
//         res.send("Cookie Invalida");
//     }
// })

//SESSION: 

//Levantando la session en el endpoint: "session"

// app.get("/session", (req, res) => {
//     //Si al conectarme, la sesión ya existe, aumento el contador de visitas. 
//     if(req.session.counter) {
//         req.session.counter++;
//         res.send("Visitaste este sitio: " + req.session.counter + " veces");
//     } else {
//         req.session.counter = 1; 
//         res.send("Bienvenido! Unite al club!");
//     }
// })

// //Logout

// app.get("/logout", (req, res) => {
//     //Para eliminar datos de una variable session, se utiliza el parametro de req y el método destroy. Lo podemos pasar con un callback. 
//     req.session.destroy( (error) => {
//         if(!error) res.send("Session cerrada");
//         else res.send("Tenemos un error");
//     })
// })

// //Login con Session: 

// app.get("/login", (req, res) => {
//     let {usuario, pass} = req.query; 

//     if(usuario === "tinki" && pass === "winki") {
//         req.session.user = usuario; 
//         req.session.admin = true; 
//         res.send("inicio de sesion exitoso!! Viva el sabadooo!");
//     } else {
//         res.send("Datos incorrectos, vete ladron malvado de mi vida!");
//     }
// })

// //Middleware de autenticación: 

// function auth(req, res, next) {
//     if(req.session.admin === true) {
//         return next();
//     }
//     return res.status(403).send("Error de autorizacion");
// }

// //Ruta privada con Login: 

// app.get("/privado", auth ,(req, res) => {
//     res.send("Si llegas hasta acá es porque sos el admin!");
// })




//Parte dos:  STORAGE
//El memory storage es el espacio de memoria volatil que tiene el servidor para almacenar la sesión. Si el servidor cae o se reinicia, se pierden las sesiones. 

//File Storage: 
//npm i session-file-store

//Connect Mongo: 
//npm i connect-mongo
