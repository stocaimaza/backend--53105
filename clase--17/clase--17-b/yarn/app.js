const express = require("express");
const app = express(); 

app.get("/", (req, res) => {
    res.send("Olis, soy Yarn!");
})

app.listen(8080);