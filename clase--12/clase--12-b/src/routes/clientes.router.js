import express from "express";
const router = express.Router();

// router.get("/nombre/:cliente([a-z]+)", (req, res) => {
//     //En esta situación yo estoy esperando un parametro por la URL, el nombre del cliente. 

//     //Para evitar que el usuario ingrese su nombre con formatos no permitidos, usamos la expresiones regulares. 

//     let cliente = req.params.cliente;
//     res.send("cliente:" + cliente);
// })

//Otra forma de hacerlo: 

router.get("/email/:email", (req, res) => {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = req.params.email;

    if(patronCorreo.test(email)) {
        res.send("Email valido:" + email);
    } else {
        res.send("Email invalido");
    }
})


//Validando Parámetros: 
//Supongamos que al crecer mi aplicación, voy a tener que generar muchas rutas que recibe el mismo parámetro: 

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a obtener un recurso a partir del parametro cliente. 
    res.send("Obteniendo un recurso para el cliente: " + req.params.cliente);
})

router.post("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a enviar un recurso a partir del parametro cliente. 
    res.send("Enviando un recurso para el cliente: " + req.params.cliente);
})

router.put("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a actualizar un recurso a partir del parametro cliente. 
    res.send("Actualizando un recurso para el cliente: " + req.params.cliente);
})


router.delete("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a eliminar un recurso a partir del parametro cliente. 
    res.send("Eliminando un recurso para el cliente: " + req.params.cliente);
})


//Nos encontramos que en los 4 métodos hay lineas de código que son iguales y se van a repetir: 

//a) Obtener el parámetro del cliente. 
//b) Buscar el cliente en la base de datos. 
//c) Una vez validado, continuar con la operacion que corresponda. 

//Esto lo podemos simplificar creando un middleware llamado "router.param":

router.param("cliente", (req, res, next, cliente) => {
    const clientes = ["firulais", "lionel", "pepe"];

    if(clientes.includes(cliente)) {
        req.cliente = cliente; 
        next(); 
    } else {
        res.status(404).send("Cliente no encontrado");
    }
})






export default router; 