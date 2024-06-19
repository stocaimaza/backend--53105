//Levantamos un pequeño servidor: 
//npm i express dotenv commander winston

import express from "express"; 
const app = express(); 
const PUERTO = 8080; 
import addLogger from "./utils/logger.js";

//Middleware
app.use(addLogger);

app.get("/", (req, res) => {
    res.send("Hola Mundo!"); 
})

//Logger Test: ruta para testear todos los logs

app.get("/loggertest", (req, res) => {
    req.logger.debug("debug");
    req.logger.http("http");
    req.logger.info("info");
    req.logger.warning("warning");
    req.logger.error("error");
    req.logger.fatal("fatal");

    res.send("Logs generados");
})

//Ejemplo: 

app.get("/usuario", (req, res) => {
    //console.log("Usuario generado")
    //Reemplazar por el logger: 
    req.logger.info("Usuario generado"); 
    res.send("Mensaje enviado"); 
})

app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto: ", PUERTO);
})

