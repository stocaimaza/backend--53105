/* CLASE 2 - NUEVAS FUNCIONALIDADES DE ECMASCRIPT */

//ECMA 6 - 2015

//1) Desestructuración: nos permite extraer datos de un array u objeto de una manera más sencilla y legible

const pelicula = {
    titulo: "El Padrino",
    director: "Francis Ford Coppola", 
    genero: "Drama",
    lanzamiento: 1972
}

let {titulo, director, genero, lanzamiento} = pelicula; 

titulo = "Frozen 2";
console.log(titulo);
console.log(pelicula);

console.log(lanzamiento);

//¿Cómo lo tenia que hacer antes de ES6 ?

let tituloPeli = pelicula.titulo; 
console.log(tituloPeli);

//¿Cómo lo hacemos con un array?

const numeros = [1,2,3,4,5];

//Antes de ES6 queria guardar estos datos en variables auxiliares: 

let uno = numeros[0];
let dos = numeros[1];
console.log(uno, dos);

//Con ES6 hago la desestructuración del Array: 

let [, , indiceDos, indiceTres, indiceCuatro] = numeros;

console.log( indiceDos, indiceTres);

//2) Valores por defecto: nos permite asignar valores por defecto a los parámetros de una función. 

function saludar(nombre = "Invitado") {
    console.log(`Hola ${nombre}`);
}

saludar("Firulais");
saludar();//Hola undefined
saludar("TinkiWinki");


//3) Trabajo por modulos: 

//Si yo quiero importar el array productosMarolio lo hago de la siguiente manera: 

import productosMarolio from "./datos.js";

console.log(productosMarolio);


//ES7: esta versión llega a nuestras vidas en el año 2016. 
//Operador de exponenciación: **
//El método includes: que me permite saber si hay algún elemento en un array o string. 

//1) Operador de Potencia: nos permite realizar cáculos de potencias de una manera más sencilla. 

//Antes de ES7: 

let base = 4;
let exponente = 3; 

let resultado = Math.pow(base, exponente);
console.log(resultado);

//Como lo hago a partir de ES7:

let resultado2 = base ** exponente;
console.log(resultado2);

//Includes: recuerden que me retorna un booleano si encuentra o no un elemento en un array o string

const losSimpsons = ["Homero", "Marge", "Bart", "Lisa", "Maggie"];

//Antes de ES7, que podia hacer? 
//Quiero saber si "bart" esta en el array y que me retorne un booleano. 
//Lo que haciamos antes era preguntar si el indice de "Bart" es mayor a -1. Si es mayor, entonces existe y retorno true. 

//con ES7: 

console.log(losSimpsons.includes("Bart")) //retorna true o false. 

//Ejemplo con un string: 

let frase = "Hola, soy Bart Simpsons"; 
console.log(frase.includes("Bart")); //tambien me deberia retornar un true. 

//ES8: 2017
//-Async Await
//-Métodos estáticos. 
//-Values, entries y keys:

//Object.values: me retorna los valores de las propiedades de un objeto:

const empleado = {
    nombre: "Pepe",
    apellido: "Argento", 
    edad: 45, 
    puesto: "Vendedor de Zapatos"
}


let resultadoEmpleadoValues = Object.values(empleado);
console.log(resultadoEmpleadoValues);

//Object.entries = devuelve un array de arrays (Matriz), donde cada sub- array contiene la clave y valor: 

const resultadoEmpleadoEntries = Object.entries(empleado);
console.table(resultadoEmpleadoEntries);
console.log(resultadoEmpleadoEntries);

//Object.keys: devuelve las claves de un objeto a un arreglo. 

const resultadoEmpleadoKeys = Object.keys(empleado);
console.log(resultadoEmpleadoKeys);

//ES9: llega a nuestra vida en 2018
//El finally llega en esta versión. Lo repasamos en el siguiente bloque. 

//Spread Operator: operador de propagación. (...) Nos permite desparramar elementos de un objeto o array (elemento iterable) de forma individual, en otro contexto. 

let arrayNombres = ["Kelvis", "Lucas", "Gustavo"];
console.log(...arrayNombres);

//Es decir lo mismo que hacer esto: 

console.log(arrayNombres[0], arrayNombres[1], arrayNombres[2]);

//Copiar objetos: 

const coky = {
    nombre: "Coky",
    apellido: "Argento",
    edad: 17
}

const alumno = coky;
//Esto no lo hacemos, porque acá estoy igualando referencias en memoria. 
console.log(coky) ;
console.log(alumno);

alumno.nombre = "Paola"; 

console.log(coky) ;
console.log(alumno);

//Si quiero copiar objetos de forma correcta: 

const alumnoDos = {...coky};
console.log(alumnoDos);

//Concatenar arrays: 

let numeros1 = [1,2,3,4,5];
let numeros2 = [6,7,8,9,10]

let numerosConcatenados = [...numeros1, ...numeros2];
console.log(numerosConcatenados);

//Clases: molde para objetos

class Persona {
    constructor(nombre, apellido, edad){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre} ${this.apellido}`);
    }
}

//Instancia de Persona: 

const persona = new Persona("Doble", "LuisMiguel", 50);
console.log(persona);

persona.saludar();

//Herencia: 

class Estudiante extends Persona {
    #promedio;
    constructor(nombre, apellido, edad, carrera, promedio){
        super(nombre, apellido, edad); 
        this.carrera = carrera; 
        this.#promedio = promedio; 
    }

    //Si yo quiero ver una variable o propiedad privada:

    get getPromedio() {
        return this.#promedio; 
    }
}


const estudiante = new Estudiante("Juan", "Gonzalez", 20, "Ingenieria en Sistemas", 10 ); 

console.log("Promedio de Juan: ");
console.log(estudiante.promedio);

//Ahora utilizando el get: 
console.log("Promedio de Juan (pero con el método GET): ");
console.log(estudiante.getPromedio);


//Variables y métodos estáticos: 

//Son variables y métodos asociados a la clase en si. Para poder utilizarlos no requiere que se genere una instancia de esa clase. 

class Contador {
    static cantidad = 0; 

    constructor() {
        Contador.cantidad++;
    }

    static obtenerCantidad() {
        return Contador.cantidad;
    }
}

const contador1 = new Contador(); 
const contador2 = new  Contador();
const contador3 = new Contador();

console.log(Contador.obtenerCantidad());