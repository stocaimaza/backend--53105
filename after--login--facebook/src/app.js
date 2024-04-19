/** LOGIN CON FACEBOOK  **/

const express = require("express");
const app = express(); 
const PUERTO = 8080; 
const exphbs = require("express-handlebars");
require("./database.js");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./config/passport.js");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuramos Session:
app.use(session({
    secret: "tu_secreto",
    resave: false, 
    saveUninitialized: false
}));

//Configuramos Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Configuramos Passport
app.use(passport.initialize());
app.use(passport.session());
initializePassport();

//Rutas

//Ruta de inicio de sesion con Faceook 
app.get("/auth/facebook", passport.authenticate("facebook"));

//Ruta callback de inicio de sesión con Facebook

app.get("/auth/facebook/callback", passport.authenticate("facebook", {successRedirect: "/inicio", failureRedirect: "/login"}));

//Ruta protegida que requiere inicio de sesion
app.get("/inicio", (req, res) => {
    if (req.isAuthenticated()) {
        let {displayName, provider} = req.user;
        res.render("inicio", {displayName, provider});
    } else {
        res.redirect("/login");
    }
})

//Ruta de cierre de sesion: 

app.get("/logout", (req, res) => {
    req.logout(function(err) {
        if(err) {
            return res.redirect("/");
        }
        return res.redirect("/login");
    })
})

//Falta la vista del Login!!!

app.get("/login", (req, res) => {
    res.render("login");
})

//Listen

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})