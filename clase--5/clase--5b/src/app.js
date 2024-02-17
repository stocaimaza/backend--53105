/** CLASE 5 - SEGUNDO BLOQUE **/

//Temas: 

//1) ¿Que son los motores de plantillas?
//2) Handlebars, instalacion y uso. 
//3) Estructuras, condicionales y ciclos.
//4) Creamos el router de Handlebars.
//5) Agregamos JS y CSS. 


//1) Motores de plantillas: son herramientas que nos permite generar HTML dinámico. 

//partials:  son estructuras que se repiten a lo largo de mi aplicación. Puede ser una card, un footer, un navbar. 


//2) Express- Handlebars, instalacion y uso. 

//Instalamos: npm i express-handlebars

//Si quieren instalar todo junto: npm i express express-handlebars 

//Armamos nuestro servidor: 

import express from "express";
import exphbs from "express-handlebars";
const app = express();
const PUERTO = 8080; 
import viewsRouter from "./routes/views.router.js";

//Configuramos handlebars: 

app.engine("handlebars", exphbs.engine());
//Acá estamos configurando el motor de plantillas, le digo a express que cuando encuentre un archivo ".handlebars", lo renderice con el motor de plantillas. 

app.set("view engine", "handlebars");
//Acá tambien le decimos que el motor de plantilas a usar es handlebars. 

app.set("views", "./src/views");
//Acá le decimos donde encuentra los archivos .handlebars

//Configuramos la carpetiña public
app.use(express.static("./src/public"));

//Rutiñas: 
app.use("/", viewsRouter);


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})
