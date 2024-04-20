import express from "express"; 
import passport from "passport";
import UsuarioModel from "../models/usuario.model.js";
const router = express.Router(); 
import jwt from "jsonwebtoken";

//Register: 

router.post("/register", async (req, res) => {
    const {usuario, password} = req.body; 

    try {
        //1) Verificamos si el usuario existe en nuestra BD.
        const existeUsuario = await UsuarioModel.findOne({usuario});

        if(existeUsuario) {
            return res.status(400).send("El usuario ya existe, pensa otro nombre");
        }

        //2) Creamos un nuevo usuario:
        const nuevoUsuario = new UsuarioModel({
            usuario,
            password       
        });

        //3) Lo guardamos en la base de datos: 
        await nuevoUsuario.save();

        //4) Generamos el Token de JWT: 
        const token = jwt.sign({usuario}, "coderhouse", {expiresIn:"1h"});

        //5) Mandamos como cookie el Token: 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, //1 hora
            httpOnly: true //La cookie solo se puede acceder mediante HTTP.
        })

        //6) Lo mandamos al home:
        res.redirect("/home");

    } catch (error) {
        res.status(500).send("Error interno del servidor, vamos a morir");
    }
})

//Login: 

router.post("/login", async (req, res) => {
    const {usuario, password} = req.body; 

    try {
        //1) Buscamos el usuario en MONGODB: 
        const usuarioEncontrado = await UsuarioModel.findOne({usuario});

        if(!usuarioEncontrado) {
            return res.status(401).send("Usuario no valido");
        }

        //2) Verificamos la contraseña: 
        if(password !== usuarioEncontrado.password) {
            return res.status(401).send("Contraseña incorrecta, hacker!");
        }

        //3) Generamos el token: 
        const token = jwt.sign({usuario: usuarioEncontrado.usuario, rol: usuarioEncontrado.rol}, "coderhouse", {expiresIn:"1h"});

        //4) Mandamos como cookie el token: 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true
        })

        //5) Te mandamos al home:
        res.redirect("/home");

    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

//Home: 

router.get("/home", passport.authenticate("jwt", {session:false}), (req, res) => {
    res.render("home", {usuario: req.user.usuario});
})

//Logout: 
router.post("/logout", (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
})

//Ruta admin: 

router.get("/admin", passport.authenticate("jwt", {session: false}), (req, res) => {
    if(req.user.rol !== "admin") {
        return res.status(403).send("Acceso Denegado, tiene 10 segundos para apagar la compu o moriraaaaa");
    }
    res.render("admin");
})

export default router;