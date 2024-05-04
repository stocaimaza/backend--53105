import express from "express";
const router = express.Router(); 

//Acá nos conectamos con el controlador: 
import JugueteController from "../controllers/juguete.controller.js";
const jugueteController = new JugueteController(); 

router.get("/", jugueteController.obtenerJuguetes); 
router.post("/", jugueteController.crearJuguete);

export default router;