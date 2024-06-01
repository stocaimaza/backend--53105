import express from "express";
const PUERTO = 8080;
const app = express(); 

app.get("/", (req, res) => {
    res.send("Hola Mundo!, estoy en Docker");
})

app.listen(PUERTO);