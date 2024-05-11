/** CLASE 16B - TEST Y MOCKS **/

//TDD: significa "Desarrollo Orientado a Pruebas".
//Es una metodología de desarrollo de software que consiste en pensar y escribir las pruebas que debe cumplir determinada función, incluso antes de escribirlas. 


//EJEMPLO CON LA FUNCIÓN SUMA: 

//paso 1 : Escribir una prueba fallida. 

// const suma = (numeroA, numeroB) => {
//     //TEST 1
//     if ( !numeroA || !numeroB) {
//         return 0;
//     }

//     //TEST 2
//     if (typeof numeroA !== "number" || typeof numeroB !== "number") {
//         return null; 
//     }

//     //TEST 3 
//     let resultado = numeroA + numeroB;
//     return resultado;
    
//     //y el punto 4? 

// }

//PARA ARMAR EL PUNTO 4, VAMOS A TENER QUE MODIFICAR TODA LA FUNCIÓN PARA RECIBIR N PARAMETROS. 

// const suma = (...numeros) => {

//     //TEST 1: 
//     if (numeros.length === 0) {
//         return 0;
//     }

//     //TEST 2: 
//     let banderita = true; 
//     for ( let i = 0; i < numeros.length && banderita; i++)  {
//         if ( typeof numeros[i] !== "number") {
//             banderita = false; 
//         }
//     }

//     if ( banderita !== true) {
//         return null; 
//     }

//     //TEST 3 y 4: 
//     let resultado = 0; 
//     for (let i = 0; i < numeros.length; i++ ) {
//         resultado += numeros[i];
//     }

//     return resultado;
// }

//PUNTO 3: REFACTORIZAR!

const suma = (...numeros) => {
    if(numeros.length === 0) return 0; 
    if(!numeros.every(num => typeof num === "number")) return null;
    return numeros.reduce((acumulador, elemento) => acumulador + elemento, 0);
}
 


//Multiples escenarios: 

//1. La función debe retornar 0 si no se pasa ningun parametro. 
//2. La función debe retornar null si algun parametro no es numerico. 
//3. La funcion debe realizar la suma correctamente. 
//4. La funcion debe realizar la suma  con cualquier cantidad de numeritos. 

let testPasados = 0; 
let testTotales = 4; 

//TEST 1: 
console.log("1. La función debe retornar 0 si nose pasa ningun parametro.");
let resultado1 = suma();
if (resultado1 === 0 ){
    console.log("Test 1 pasado!"); 
    testPasados++;
} else {
    console.log("El test 1 no paso, se esperaba 0 y recibimos: " + resultado1)
}
console.log("--------------------------------------------------------------");

//TEST 2: 
console.log("2. La función debe retornar null si algun parametro no es numerico.");
let resultado2 = suma("2", 3);
if ( resultado2 === null ) {
    console.log("Test 2 pasado!");
    testPasados++;
} else {
    console.log("El test 2 no paso, se esperaba null y recibimos: " + resultado2)
}
console.log("--------------------------------------------------------------");

//TEST 3: 
console.log("3. La funcion debe realizar la suma correctamente.");
let resultado3 = suma(2, 3);
if ( resultado3 === 5) {
    console.log("Test 3 pasado!");
    testPasados++;
} else {
    console.log("El test 3 no paso, se esperaba 5 y recibimos: " + resultado3)
}
console.log("--------------------------------------------------------------");

//TEST 4: 
console.log("4. La funcion debe realizar la suma  con cualquier cantidad de numeritos.");
let resultado4 = suma(1, 2, 3, 4, 5);
if ( resultado4 === 15) {
    console.log("Test 4 pasado!");
    testPasados++; 
} else {
    console.log("El test 4 no paso, se esperaba 15 y recibimos: " + resultado4)
}
console.log("--------------------------------------------------------------");

if ( testPasados === testTotales ) {
    console.log("Felicitaciones!! Lo tuyo es la programación!");
} else {
    console.log("Se pasaron " + testPasados + " de un total de " + testTotales);
}