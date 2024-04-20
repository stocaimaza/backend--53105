//5) Listeners

//process.on() es un método que me permite registrar escuchadores de eventos, para el proceso principal. 

//ALGUNOS DE LOS EVENTOS MÁS COMUNES: 

//"exit", para ejecutar un código justo antes de que cierre el proceso. 

// process.on("exit", () => {
//     console.log("Esta linea se ejecuta siempre antes de terminar el proceso, como un ultimo paso. "); 
// })

console.log("Hola Mundo");
console.log("¿Cómo estan? ");

process.on("exit", (code) => {
    console.log("Finalizamos con un error en el proceso:  ", code); 
})

// Excepciones no controladas: on "uncaughtException"

process.on("uncaughtException", () => {
    console.log("Tuvimos que capturar un error");
    process.exitCode = 1; 
})    

firulais(); 
//Estoy invocando una función que no existe. Provocando un error. 
