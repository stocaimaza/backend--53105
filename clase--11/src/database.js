import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Siii nos conectamos a la BD"))
    .catch((error ) => console.log("SEVEN DAYS ", error))