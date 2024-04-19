const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/Facebook?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexion exitosa!"))
    .catch((error) => console.log("No nos pudimos conector, todo es bronca y dolor", error))
    