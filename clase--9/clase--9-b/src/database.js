import mongoose from "mongoose";

await mongoose.connect("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/Pizza?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectado a la BD"))
    .catch((error) => console.log("No pudimos conectarnos por este motivo: ", error))