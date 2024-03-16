/** CLASE 9 - MONGODB AVANZADO 1 **/

//Temas de hoy: 

//1) Teoria de la indexación
//2) Manejo de Populations en MongoDB
//3) PRE


////////////////////////////////////////////////////////////////////////////////////////
// Teoria de la indexación:

//La indexación es una técnica o proceso que se realiza para poder realizar consultas más rápidas. 

//Este nos permitirá tener una referencia previa al momento de buscar un documento, con el fin de evitar recorrer toda la colección, documento por documento, hasta encontrar dicho valor. 

//Esta referencia se conoce como índice y se crea a partir de uno o varios campos del documento. 
/*
import mongoose from "mongoose";
import UserModel from "./models/user.js";

const main = async () => {
    await mongoose.connect("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/Tienda?retryWrites=true&w=majority&appName=Cluster0")

    const respuesta = await UserModel.find({edad: {$lt:19}}).explain("executionStats");
    //Recordemos que el metodo find() nos devuelve un array de objetos, por lo tanto podemos aplicarle el metodo explain() para ver las estadisticas de la ejecucion de la consulta. 
    //"executionsStats" es un parametro que se puede pasar al momento de usar explain() para obtener detalles de los tiempos de demora en la consulta. 
    console.log(respuesta);

}

main();

*/
//Tiempo de respuesta: 

//Sin indice
//Consultamos por "Carlos".
//Me retorna 111 documentos y el tiempo de respuesta fue de 19 milisegundos.  

//Con indice en "nombre":
//Retorna igual 111 documentos y demora 0ms en la respuesta. 

//Verificamos por edad: 
//Filtramos personas con menos de 19 años: 
//Retorna 384 y demora 23milisegundos. 

//Aplicamos el index y comparamos
//Retorna 384 y demora 1 milisegundo. 

///////////////////////////////////////////////////////////////////////////////////////
// Manejo de Populations en MongoDB:

//Populate es una función de Mongoose que nos permite relacionar documentos de diferentes colecciones. 

//Por ejemplo, yo en mi colección alumnos tengo un campo que se llama cursos, ese es campo es un array de objetos que son los cursos actuales del alumno. 

//Ejercicio: 

import AlumnoModel from "./models/alumno.js";
import CursoModel from "./models/curso.js";

import mongoose from "mongoose";

const start = async () => {
    await mongoose.connect("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/Tienda?retryWrites=true&w=majority&appName=Cluster0");

    // const respuesta = await CursoModel.find();
    // console.log(respuesta);


    //Busco estudiante y busco el curso de backend: 
    //const estudiante = await AlumnoModel.findById("65f5c08fc9af8ef1a277eb83");
    //console.log(estudiante);

    //const cursoBackend = await CursoModel.findById("65f5c07dc9af8ef1a277eb7f")
    //console.log(cursoBackend);

    //Ahora ingreso el curso al alumno: 
    //estudiante.cursos.push(cursoBackend);

    //Actualizo el documento: 
    //await AlumnoModel.findByIdAndUpdate("65f5c08fc9af8ef1a277eb83", estudiante);

    //testeamos, como se ve el alumno y si se muestra el curso asignado: 

    const estudianteConCursoAsignado = await AlumnoModel.findById("65f5c08fc9af8ef1a277eb83");
    //.populate("cursos");

    console.log(estudianteConCursoAsignado);


}

start();