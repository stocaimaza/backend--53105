/** LOGIN CON JWT **/

//npm i mongoose express jsonwebtoken cookie-parser passport passport-jwt express-handlebars

import express from "express";
import exphbs from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
const app = express();
const PUERTO = 8080;
import "./database.js";
import viewsRouter from "./routes/views.router.js";
import usuarioRouter from "./routes/usuario.router.js";
import initializePassport from "./config/passport.config.js";


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());
app.use(passport.initialize());
initializePassport(); 


//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas 
app.use("/", viewsRouter);
app.use("/", usuarioRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto de Mar del Plata`);
})
