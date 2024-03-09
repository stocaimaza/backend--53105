//Nos conectamos con MongoAtlas 

import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/Tienda?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la BD, si miedo al exito"))
    .catch(() => console.log("Todo mal, me paso a diseño de indumentaria"))