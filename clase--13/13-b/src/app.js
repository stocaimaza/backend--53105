/** CLASE 13 - SEGUNDA PARTE  **/
/** PROCESO PRINCIPAL DEL SERVIDOR + GLOBAL & CHILD PROCESS **/

//Temas: 

//1) Objeto Process
//2) Manejo de argumentos 
//3) Commander JS
//4) Manejo de variables de entorno
//5) Listener
//6) Child Process

/////////////////////////////////////////////////////////////////

//Objeto Process

//console.log("Bienvenidos Curso Backend!");

//Cada vez que yo ejecuto en la consola: node src/app.js se crea automáticamente un objeto llamado "process", y este objeto tiene mucha información sobre este proceso. 

//console.log(process); 

//Algunos elementos importantes: 

//console.log(process.cwd());
//Me retorna el directorio actual del proceso. 

//console.log(process.pid);
//Obtengo el ID del proceso en el sistema operativo. 
//Por el momento, conocer este dato no nos resulta tan importante, peeeeero si estamos trabajando con varios procesos en la mismoa computadora, conocer este ID nos puede ayudar a monitorear los procesos. 

//console.log(process.memoryUsage()); 
//Me retorna el valor en bytes. 
//Cantidad de momoria que usa el proceso.

//console.log(process.version); 
//Si quiero conocer la versión del Proceso: 
//Version de Node. 

//process.exit(); 
//Esto finaliza el proceso. 

//console.log("Texto adicional");
//Este texto no se muestra nunca. 

// Manejo de argumentos en la consola. 

//console.log(process.argv);
//Me retorna un array con todos los argumentos que yo paso en la consola. 

//3) Commander JS: libreria que me permite manejar mis argumentos. 

//npm i commander

//Testeamos los diferentes entornos de trabajo: 

import express from "express";
import mongoose from "mongoose";
const app = express(); 
import configObject from "./config/config.js";
import UserModel from "./models/usuario.model.js";

const {mongo_url, puerto} = configObject; 

//Me conecto con MongoDB: 

await mongoose.connect(mongo_url)
    .then(() => console.log("Conectados!"))
    .catch((error) => console.log(error))

//Ruta: 

app.get("/", async (req, res) => {
    try {
        const usuarios = await UserModel.find();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})

app.listen(puerto, () => console.log(`Escuchando desde el puerto ${puerto}`));


//6) Child Process: 

// function operacionCompleja() {
//     let resultado = 0; 

//     for(let i = 0; i <5e9; i++){
//         resultado += i; 
//     }

//     return resultado; 
// }

// app.get("/suma", (req, res) => {
//     const resultado = operacionCompleja();
//     res.send(`El resultado de la operacion: ${resultado}`);
// })

//Pasitos para lograr el forkeo: 

//1) Separamos la función que trae problemas a otro modulo.
//2) La modificamos y la dejamos disponible para cuando el padre la solicite. 
//3) Ejecutamos la ruta. 

import {fork} from "child_process";
//No hace falta instalar nada, ya es un proceso nativo. 

app.get("/suma", (req, res) => {
    const child = fork("./src/operacionesComplejas.js");
    child.send("iniciando"); //Acá el proceso padre le envia un mensaje al hijo. 
    child.on("message", resultado => {
        res.send(`El resultado de la operacion es: ${resultado} `);
    })
})
