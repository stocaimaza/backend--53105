/** CLASE 18 - PRIMERA PARTE **/

//Temas: 

//1) Que son los Logger
//2) Winston
//3) Test de carga con Artillery


//LOGGERS: son herramientas que registran información importante sobre el funcionamiento de una aplicación mientras esta se ejecuta. 
//Estos registros son útiles para diagnosticar problemas, rastrear eventos y ver el rendimiento del sistema. 


//Tienen dos caracteristicas importantes: 

//1) Podemos separar los mensajes de la aplicacion en diferentes "niveles". Es decir que podemos tener warnings, errores, errores fatales/criticos, etc. 

//2)Podemos enviar esa informacion a otros recursos, a partir de unos elementos llamados "transportes". Entonces puedo enviar mis logs a base de datos, archivos, mails, mensajes. 

//WINSTON: Es una popular biblioteca de Loggin (registro) de Node JS. 

//npm i winston
//3.13.0 version actual 

import express from "express";
const app = express(); 
const PUERTO = 8080;
//Vamos a importar el middleware: 
import addLogger from "./utils/logger.js";

app.use(addLogger);

app.get("/firulais", (req, res) => {
    res.send("Olis, ke asen?");
})

//Ruta para testear: 
app.get("/loggertest", (req, res) => {
    req.logger.debug("Mensaje de Debug");
    req.logger.http("Mensaje de HTTP");
    req.logger.info("Mensaje de INFO");
    req.logger.warning("Mensaje de Warning");
    req.logger.error("Mensaje de ERROR");

    res.send("Logs generados");
})

//Simulamos algunos procesos con Artillery: 

app.get("/operacionsimple", (req, res) => {
    let suma = 0; 
    for ( let i = 0; i < 10000000; i++ ) {
        suma += i; 
    }

    res.send({suma});
})

app.get("/operacioncompleja", (req, res) => {
    let suma = 0; 
    for ( let i = 0; i < 5e8 ; i++ ) {
        suma += i; 
    }

    res.send({suma});
})


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})

//Artillery: me permite testear el funcionamiento de mi aplicación frente a la concurriencia de múltiples usuarios. 

//Se recomienda la instalacion global: npm i artillery -g

//Preparamos nuestro comando para testear: 

//Operacion Simple: 
//artillery quick --count 40 --num 50 "http://localhost:8080/operacionsimple" -o simple.json


//Operacion Compleja: 
//artillery quick --count 40 --num 50 "http://localhost:8080/operacioncompleja" -o compleja.json




//
//
