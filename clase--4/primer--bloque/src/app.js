/** CLASE 4 - SERVIDORES WEB && EXPRESS  **/

//Temas de hoy: 

//1) ¿Que es un servidor? 
//2) Protocolo HTTP. 
//3) Modulo Nativo HTTP. 
//4) Express JS
//5) Objeto request
//6) Presentamos el desafio n°3. 

//////////////////////////////////////////////

//1) Servidor: software o hardware que almacena y administra recursos. Estos recursos pueden ser imágenes, archivos, sitios web, videos, datos. 
//La función del servidor es responder las peticiones del cliente. Es importante aclarar que el servidor puede responder a multiples clientes al mismo tiempo. Esto se conoce como modelo cliente-servidor. 

//cliente (puede ser el navegador web) = pedido = request.
//servidor (quien administra los datos) = response = respuesta. 

//¿Bajo que protocolo se comunican? HTTP. 

//HTTP: "Protocolo de transferencia de hipertexto", es un protocolo de comunicacion, es decir un conjunto de reglas que definen como se comunican los dispositivos. 

//Antes de avanzar: instalamos nodemon
//npm i nodemon -D (este es el comando que colocamos en la consola)

//Y despues podemos configurar nuestro script: 
//"dev": "nodemon src/app.js"

//Y lo ejecutamos: npm run dev

//Modulo HTTP: nos permite crear un servidor y enviar información a traves del protocolo HTTP. 

//1) Primer paso: vamos a importar el modulo

///const http = require("http");
//import http from "http";

//2) Segundo paso: vamos a usar el metodo createServer() del modulo HTTP. Este metodo recibe una funcion callback como parametro, esta funcion se va a ejecutar cada vez que se realice una peticion al servidor. 

// const server = http.createServer( (request, response) => {
//     //Esta funcion callback, tiene dos parametros: request, response
//     console.log("Conectado! ");
//     response.end("Mi primer Hola Mundo desde backend");
//     //Este es un método que nos permite enviar una respuesta al cliente. Es muy importante que se ejecuta en las peticiones. 
// })

//3) Vamos a poner a escuchar a nuestro servidor. 

const PUERTO = 8080; 

// server.listen(PUERTO, () => {
//     //console.log(`El servidor se esta escuchando en el puerto ${PUERTO}`)
//     //Tambien pueden colocar: 
//     console.log(`Escuchando en el http://localhost:${PUERTO}`);
// })

//4) Express JS: es un framework minimalista de Node JS que nos permite crear servidores web de una forma mucho más simple. 

//4.1) Instalamos: npm install express

//4.2) Importamos el modulo de express:

const express = require("express");

//4.3) Creamos la app de express: 

const app = express();


//Los métodos HTTP o verbos son los que nos permiten indicarle al servidor que tipo de acción queremos realizar. Los más usados: GET, POST, PUT, DELETE. 

//GET se utiliza para pedir datos al servidor. 
//POST se utiliza para enviar datos al servidor. 
//PUT se utiliza para actualizar datos en el servidor. 
//DELETE para eliminar datos en el servidor. 

//4.4) Creamos nuestra ruta para conectarme con el servidor. 

app.get("/", (req, res) => {
    //Cuanto utilizo "/", estoy haciendo referencia a la ruta raíz de mi aplicación. 
    res.send("Mi primer servidor desde Express JS");
})

//4.5) Ponemos a escuchar nuestro servidor: 

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})

//Practicamos con otras rutas

app.get("/tienda", (req, res) => {
    res.send("Bienvenidos a la seccion Tienda");
})

app.get("/contacto", (req, res) => {
    res.send("Estamos en Contacto");
})

//5)Objeto request: es un objeto que representa la petición del cliente al servidor. Y tiene mucha información que vamos a aprender a utilizar: 

//Vamos a crear un array de productos para practicar: 

const misProductos = [
    {id: 1, nombre: "Fideos", precio: 150},
    {id: 2, nombre: "Arroz", precio: 250},
    {id: 3, nombre: "Pan", precio: 350},
    {id: 4, nombre: "Helado", precio: 450},
    {id: 5, nombre: "Galletitas", precio: 550},
    {id: 6, nombre: "Mermelada", precio: 650},
    {id: 7, nombre: "Queso", precio: 750},
    {id: 8, nombre: "Gaseosa", precio: 850},
]

//Vamos a crear una ruta "productos" que nos retorne todos los elementos del array. 

app.get("/productos", (req, res) => {
    res.send(misProductos);
})

//Practicamos lo siguiente: que me retorne un producto segun su id 

//req.params: contiene los parametros de la ruta. Por ejemplo si queremos acceder a un id de un producto: /productos/:id

app.get("/productos/:id", (req, res) => {
    let id = req.params.id;
    //Cuando ustedes recuperan un dato de los params, es un string.

    const producto = misProductos.find(producto => producto.id == id);

    if(producto) {
        res.send(producto);
    } else {
        res.send("Producto no encontrado");
    }
})


//req.query = query se refiere a las multiples consultas que se pueden hacer en determinado endpoint. Simplemente le tenemos que colocar el simbolo de interrogacion ? y luego el nombre de la consulta. 


//Por ejemplo, si quiero guardarme el nombre y apellido de un cliente: 
//http://localhost:8080/clientes?nombre=Juan&apellido=perez 


app.get("/clientes", (req, res) => {
    // let nombre = req.query.nombre;
    // let apellido = req.query.apellido;

    let {nombre, apellido} = req.query;

    res.send(`Bienvenido cliente: ${nombre} ${apellido} `);
})

//Ejercicio: usamos query para pedir la cantidad de productos que debe retornar del array. 

app.get("/product", (req, res) => {
    let limit = parseInt(req.query.limit);

    const productos = misProductos.slice(0, limit);
    res.send(productos);
    //Recuerden, el método slice me genera una copia parcial de un array. 
})

