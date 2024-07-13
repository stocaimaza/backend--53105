console.log("Hola mama, estoy programando en TypeScript"); 

//Tipos de datos: 

//String: 

let nombre : string = "Pepe";
let apellido : string = "Argento";

//Number: 

const nacimiento : number  = 1960; 

//Booleanos: 

let trabaja : boolean = true; 

//Undefined y Null: 

let variableUndefined : undefined = undefined; 
let variableNull : null = null;

//Objeto literal: 

const persona : {nombre: string, edad: number} = {
    nombre: "Juan",
    edad: 30
}


//Tambien se puede realizar con una "Interface"

interface Alumno {
    nombre: String, 
    edad: number
}

let alumnito = {
    nombre: "Coky",
    edad: 18
}

//Arrays: 

const numeros : number[] = [1,2,3,4]; 
const personas : string[] = ["Juan", "Pablo", "Lucas"]; 
const combinadito : (number | string)[] = ["Ola", "ke", "ase", 100];

// Funciones: 

function suma(numeroA: number, numeroB: number): number {
    //Le decis que el retorno debe ser un number
    return numeroA + numeroB; 
}

console.log(suma(155,5));

const restar = (a: number, b: number) => a - b; 
//Aca ya TS interpreta que el retorno es un number. 

//Clases: 

class Perro {
    raza: string;
    edad: number;
    constructor(raza: string, edad: number) {
        this.raza = raza;
        this.edad = edad; 
    }

    ladrar() {
        console.log("guauuuuuuu"); 
    }
}

//Instancia de la clase: 

const firulais = new Perro("Ladrador", 5);
