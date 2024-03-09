//Importamos mongoose: 
import mongoose from "mongoose";

//1) Definimos un esquema "Schema". 

//Este es un objeto que nos permite definir la forma de los documentos. Configuramos el nombre de los campos y los tipos de datos que almacenaran.

const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number,
}); 

//definimos el modelo: 
const ClientesModel = mongoose.model("clientes", clientesSchema);

export default ClientesModel; 