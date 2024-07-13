"use strict";
console.log("Hola mama, estoy programando en TypeScript");
//Tipos de datos: 
//String: 
let nombre = "Pepe";
let apellido = "Argento";
//Number: 
const nacimiento = 1960;
//Booleanos: 
let trabaja = true;
//Undefined y Null: 
let variableUndefined = undefined;
let variableNull = null;
//Objeto literal: 
const persona = {
    nombre: "Juan",
    edad: 30
};
let alumnito = {
    nombre: "Coky",
    edad: 18
};
//Arrays: 
const numeros = [1, 2, 3, 4];
const personas = ["Juan", "Pablo", "Lucas"];
const combinadito = ["Ola", "ke", "ase", 100];
// Funciones: 
function suma(numeroA, numeroB) {
    //Le decis que el retorno debe ser un number
    return numeroA + numeroB;
}
console.log(suma(155, 5));
const restar = (a, b) => a - b;
//Aca ya TS interpreta que el retorno es un number. 
//Clases: 
class Perro {
    constructor(raza, edad) {
        this.raza = raza;
        this.edad = edad;
    }
    ladrar() {
        console.log("guauuuuuuu");
    }
}
//Instancia de la clase: 
const firulais = new Perro("Ladrador", 5);
