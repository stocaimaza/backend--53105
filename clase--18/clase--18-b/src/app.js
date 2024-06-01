//CLUSTERIZAR NUESTRA APP. 

//console.log(process.pid);
//Recuerden que con esta propiedad obtengo el ID del Proceso. 

//NOTA: El proceso principal es el Primary Process (antiguamente Master), mientras que los procesos hijos o instancias se llamaran workers o trabajadores. 

import cluster from "cluster";
//Modulo Nativo de Node JS que nos permite realizar el proceso de Clusterizar mi Servidor. 

//Verificamos la capacidad de mi compu: 
import { cpus } from "os";
const numeroDeProcesadores = cpus().length;
//console.log(numeroDeProcesadores)

import express from "express";

if(cluster.isPrimary) {
    console.log("Proceso Primario");
    for( let i = 0; i < numeroDeProcesadores; i++ ) {
        cluster.fork(); 
    }
} else {
    console.log(`me presento, soy un proceso worker con el id: ${process.pid}`);
    const app = express(); 

    app.get("/", (req, res) => {
        res.send("Proceso Worker!");
    })

    app.get("/operacionsimple", (req, res) => {
        let suma = 0; 
        for ( let i = 0; i < 10000000; i++ ) {
            suma += i; 
        }

        res.send({suma});
    })

    app.get("/operacioncompleja", (req, res) => {
        let suma = 0; 
        for ( let i = 0; i < 5e8; i++ ) {
            suma += i; 
        }

        res.send({suma});
    })


    app.listen(8080, () => {
        console.log("Escuchando en el puerto 8080 de Mar del Plata");
    })
}


//Testeamos con Artillery: 

//artillery quick --count 40 --num 50 "http://localhost:8080/operacionsimple" -o simple.json

//artillery quick --count 40 --num 50 "http://localhost:8080/operacioncompleja" -o compleja.json
