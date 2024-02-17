import {Router} from "express";
const router = Router(); 


const arrayProductos = [
    {nombre: "Fideos", descripcion: "Los mas ricos", precio: 100},
    {nombre: "Arroz", descripcion: "El que no se pasa", precio: 200},
    {nombre: "Helado", descripcion: "Mas frio que el corazon de tu ex", precio: 300}
]

router.get("/", (req, res) => {
    const usuario = {
        nombre: "Tinki",
        apellido: "Winki",
        mayorEdad: true
    }

    res.render("index", {titulo:"Esto es un titulo", usuario, arrayProductos});
})

router.get("/contacto", (req, res) => {
    res.render("contacto",{titulo:"Seccion Contacto"});
})

export default router; 