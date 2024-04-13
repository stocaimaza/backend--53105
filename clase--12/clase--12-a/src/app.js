/** CLASE 12 - PASSPORT AVANZADO **/

//Diferentes formas de enviar JWT: 

const express = require("express");
const app = express();
const PUERTO = 8080;
const jwt = require("jsonwebtoken");
const initializePassport = require("./config/passport.config.js");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const { passportCall } = require("./utils/util.js");



//Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

//Rutas

app.post("/login", (req, res) => {
    let { usuario, pass } = req.body;
    if (usuario === "tinki" && pass === "winki") {
        let altoketoken = jwt.sign({ usuario, pass }, "coderhouse", { expiresIn: "24h" });
        //res.send({message:"Login exitoso", token});

        //Enviar token desde Cookie: 
        res.cookie("coderCookieToken", altoketoken, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ message: "login exitoso" });

        //60*60*1000  representa una hora en milisegundos. 
        //La opción httpOnly es una medida de seguridad que indica que la cookie solo se puede acceder a traves del protocolo HTTP y no mediante JS en el navegador. 

    } else {
        res.send("Login fallido");
    }
})

//Armamos la ruta current a la cual tenemos que acceder si nos identificamos. 

// app.get("/current", passport.authenticate("jwt", {session:false}), (req, res) => {
//     res.send(req.user);
// })


//Usando el passportCall: 

app.get("/current", passportCall("jwt") ,passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send(req.user);
})

app.listen(PUERTO, () => {
    console.log(`Escuchando el puerto: ${PUERTO}`);
})