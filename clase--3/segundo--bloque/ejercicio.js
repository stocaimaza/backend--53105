/*Calculadora de Edad */

//Importamos la dependencia moment: 

const moment = require("moment"); 

//Debe contar con una variable que almacene la fecha actual. 
const fechaActual = moment(); 

//Variable con fecha de mi nacimiento: 
const fechaNacimiento = moment("1987-03-10");

//Validar la fecha: 

if(fechaNacimiento.isValid()) {
    const diasPasados = fechaActual.diff(fechaNacimiento,"days");
    console.log(diasPasados);
}