const mongoose = require("mongoose");
require("dotenv").config(); 

mongoose.connect(process.env.MONGO_URL)
    .then( () => console.log("Conectado a la BD"))
    .catch( (error) => console.log(error))