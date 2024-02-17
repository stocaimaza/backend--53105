/** CLASE 5 - PRIMER BLOQUE **/

//Temas de hoy: 

//1) Express Router
//2) Middleware
//3) Servicios de archivos estáticos
//4) Multer
//5) Presentar la Primer Pre Entrega del TP Final. (Guarda!! Cuidado!!)

//Express Router: herramienta que me permite separar mis rutas en distintos módulos. 

//Ejercicio: Mascotas y Usuarios 

const express = require("express");
const app = express(); 
const PUERTO = 8080;
const usersRouter = require("./routes/users.router.js");
const petsRouter = require("./routes/pets.router.js");


app.use(express.json())
//Acá le digo a express que voy a recibir datos en formato JSON. 

//Rutas
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

//Listen: 
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})

//2) Servicio de archivos estáticos. 
//Express nos permite tener archivos estáticos, es decir archivos que no cambian, por ejemplo pueden ser: html, css, imagenes, js. etc. 
//Estos archivos estan visibles para el cliente de forma directa. 

//Si yo ingreso a mi aplicación voy a ver mi index.html con el saludo. 
//¿Como puedo lograr esto? Diciendole a express que tengo una carpetita estatica: 

//app.use(express.static("public"));

//Prefijo virtual: 
//Si queremos que la carpeta public se llame de otra forma, podemos hacerlo con este codigo: 

app.use("/firulais", express.static("public"));

//¿Cuales son las ventajas de usar un prefijo virtual?
//- Me permite organizarme mejor con las rutas
//- Me da una capa más de seguridad

//3) Middleware: 

//Es una función que se ejecuta entre la petición y la respuesta del servidor. Funciona como un puente entre ambas o un intermediario. 

//4) Multer. 

//Multer es un middleware de express que nos permite trabajar con archivos. Subirlos al servidor. 

//A) Instalamos: npm install multer
//B) Importamos el módulo

const multer =  require("multer");

//C) Tengo que crear una constante llamada upload donde le voy a decir donde se alojan las img.

//Puedo configurar un storage: 
//Si queremos que los archivos se guarden en la carpeta correcta, con formato y el nombre original, tenemos que configurar un storage. 
//Acá colocamos dos propiedades: destination y filename. 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img");
        //Carpeta donde se guardan las imagenes. 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        //Matengo el nombre original
    }
})

const upload = multer({storage:storage});

//D) generamos la ruta post: 

app.post("/upload", upload.array("imagen"), (req, res) => {
    res.send("Imagen cargada!")
})
