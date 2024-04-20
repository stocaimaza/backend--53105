import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/JWT?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la CoderBase"))
    .catch((error) => console.log("Houston, tenemos un problema: ", error))