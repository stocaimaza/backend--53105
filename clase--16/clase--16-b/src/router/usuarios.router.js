import express from "express";
import { generarUsuarios } from "../utils/faker.js";
const router = express.Router(); 

router.get("/", (req, res) => {
    //Generamos un array de usuarios: 
    const usuarios = [];

    for (let i = 0; i < 100; i++) {
        usuarios.push(generarUsuarios());
    }
    res.json(usuarios);
})

export default router;