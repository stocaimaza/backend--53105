import mongoose from "mongoose";

const schema = new mongoose.Schema({
    nombre: String,
    categoria: String, 
    precio: Number,
    fullname: {
        type: String, 
        required: true
    }
})

const JuguetesModel = mongoose.model("juguetes", schema);

export default JuguetesModel; 