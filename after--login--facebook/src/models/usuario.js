const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    first_name: String,
    provider: String, 
    accountId: String
})

const UsuarioModel = mongoose.model("usuarios", schema);

module.exports = UsuarioModel; 
//export default UsuarioModel; 
