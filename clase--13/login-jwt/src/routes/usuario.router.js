import express from "express"; 
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

export default router;