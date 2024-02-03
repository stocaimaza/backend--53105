/* NPM - NUESTRO MANEJADOR DE PAQUETES */

//Temas: 

//Conceptos importantes de Node y NPM. 
//Modulos nativos de Node JS. 
//NPM: manejamos paquetes de terceros. 
//Pasos para instalar una dependencia. 
//Instalaciones globales vs locales. 
//Versionado de dependencias. 
//Politicas para actualizar dependencias. 

//Conceptos importantes: 

//Modulo: es un archivo de JS que contiene un conjunto de funciones que nos permite resolver una tarea particular. 

//¿De que forma podemos trabajar con módulos?


//A) Modulos escritos por nosotros mismos. 

//Existen dos formas de trabajar con modulos en nuestras aplicaciones: Common JS y ES Modules. 

//Importamos con Common JS: 

// const saludos = require("./saludos.js");

// saludos.temprano();

// saludos.tarde();

// saludos.noche();

//A partir del año 2015, se incorporó una nueva forma de importar llama ES Modules. 

import { temprano, tarde, noche } from "./saludos.js";

temprano();
tarde();
noche();

//No se olviden de agregar el "type": "module" en el package.json

//Si queres importar le fileSystem Promises en ES Modules: 

//import {promises as fs } from "fs";


//Módulos nativos de Node: recuerden que estos modulos vienen por defecto en Node y ya tienen un conjunto de funciones que nos permiten resolver una tarea en particular. 

//Lo mas conocidos: 

//fs: es un manejador de archivos. 
//http: para crear un servidor web. 
//path: para trabajar con rutas de archivos. 
//crypto: para trabajar con encriptación de datos. 
//timers: para trabajar con tareas asincrónicas. 
//console: para mostrar mensajes por consola. 

//Modulos de terceros: NPM 

//NPM: Node Package Manager. Es un gestor de paquetes de Node JS. Nos permite instalar paquetes de terceros para poder usarlos en nuestros proyectos. 

//¿Que es un paquete? Es un conjunto de módulos que resuelven una tarea en particular. Siempre los paquetes van a tener un archivo package.json. 

//Para crear un nuevo paquete / proyecto: npm init y si quieren que tome todas las opciones por default npm init --yes

//Dependencia: es un paquete o modulo externo que mi proyecto necesita para funcionar correctamente. 

//Pasos para instalar una dependencia: 
//Utilizamos el comando: npm install nombreDependencia
//Tambien de forma abreviada:  npm i sass (ejemplo)

//Recuerden que cuando ejecutan "npm install", se lee el listado de depenencias del package.json y se instalan todas, generando nuevamente el node_modules. 

//Desistalamos una dependencia: 
//Comando: npm uninstall nombreDependencia

//Dependencias de desarrollo: son aquellas que solo necesitamos para desarrollar nuestra aplicación. Por ejemplo "nodemon" ( me permite reiniciar el servidor cada vez que hago un cambio en el codigo )

//¿Como instalo una dependencia de desarroollooooo?
//npm install nombreDepencia -D


//Scrips: Son un conjunto de comandos que nos permite ejecutar tareas en nuestro proyecto: 
//Ejemplo: "start" : "node main.js"

//Otro ejemplo "dev" : "nodemon src/app.js" (Lo usamos la clase que viene). 

//Y si quiero instalar una version anterior? 
//Tenemos que usar el @ : npm install momento@1.0.0

//Tenemos un comando para revisar si tenemos paquetes o dependencias en versiones antiguas: 
//npm outdated

//Y si queremos actualizar de forma automática: npm update. Nos avanza a la version estable pero ojota, no actualiza los json. 

//Dependencias locales: solo se aplican a mi proyecto. 
//Dependencias globales: se pueden utilizar en todos mis nuevos proyectos. Cuidado! Quedas atado a esa version. 
//Comando para instalar dependencias globales: npm install sass -g

//Si quieren ver el lista de dependencias globales de su compu: 
//npm -g list