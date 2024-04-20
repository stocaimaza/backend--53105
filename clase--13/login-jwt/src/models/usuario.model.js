import mongoose from "mongoose";

const schema = new mongoose.Schema({
    usuario: String,
    password: String,
    rol: {
        type: String, 
        enum: ["admin", "user"], //Enumera los roles permitidos. 
        default: "user" //Asignamos por default "user"
    }
})

const UsuarioModel = mongoose.model("usuarios", schema);

export default UsuarioModel; 