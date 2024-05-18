/** CLASE 17 - OPTIMIZACION DEL SERVIDOR **/

//COMPRESION: 

//Algoritmos: gzip y brotli

//Levantamos un servidor: 

import express from "express";
const app = express(); 
const PUERTO = 8080;
import usuariosRouter from "./routes/usuarios.router.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//instalamos: npm i express-compression

//GZIP: Es un algoritmo de compresion de datos ampliamente utilizado que fue creado en la decada del 90. Comprime los datos utilizando el algoritmo DEFLATE. Es compatible con la mayoria de navegadores y servidores web. 

//1) Importamos el módulo: 

import compression from "express-compression";
import manejadorError from "./middleware/error.js";

//2) Lo usamos como middleware: 

//Solo con gzip:
//app.use(compression());

//Con Brotli: 
app.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
        //zlib: es una depencia interna de brotli que espera un objeto con diferentes niveles de compresion. 
    }
}));

//Rutas: 

app.get("/", (req, res) => {
    let string = "Hola coders, soy un string ridiculamente largo";

    for ( let i = 0; i < 5e4; i++ ) {
        string += "Hola coders, soy un string ridiculamente largo";
    }
    res.send(string);
})


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})

//Sin compresión, los datos son de 2.3mb
//Con compresion, los datos son de 7.1kb
//Con brotli, los datos son de 364b

//Middleware para gestionar los errores: 

app.use("/usuarios", usuariosRouter);
app.use(manejadorError);