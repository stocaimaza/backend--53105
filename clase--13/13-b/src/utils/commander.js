import {Command} from "commander";
//Importamos Command del modulo comander. 

const program = new Command(); 
//Generamos una instancia de Command. 

//Program nos permite configurar nuestros argumentos. 

//1- Comando // 2- La descripcion // 3- Valor por default

program 
    .option("-p <port>", "puerto donde se inicia el servidor", 8080)
    .option("--mode <mode>", "modo de trabajo", "produccion")
program.parse();

//Verificamos que esto funciona: 

//console.log("Opciones: ", program.opts());

export default program; 

