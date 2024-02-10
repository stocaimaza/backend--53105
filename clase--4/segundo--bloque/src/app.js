/** SEGUNDO BLOQUE - EXPRESS AVANZADO **/

//Temas: 

//1) Código de estado. 
//2) ¿Que es una API? 
//3) API Rest. 
//4) Métodos de petición. 
//5) Postman

///////////////////////////////////////////////////

//1) Codigos de estado: cada vez que hacemos una peticion al servidor, este no solo me responde con informacion, tambien nos debe informar el "estado de la peticion", esto lo hace a partir de numeritos de 3 cifras. 

//Se organizan en 5 categorias: 

//Los que comienzan con 1xx: son respuestas informativas. 
//Los que comienzan con 2xx: son respuestas exitosas, indica que la peticion fue recibida, entendida y aceptada exitosamente. 
//Los que comienzan con 3xx: son redirecciones, el cliente necesita realizar algunas acciones adicionales para completar la solicitud. 
//Los que comienzan con 4xx: errores del cliente, el error existe en la petición del cliente. 
//Los que comienzan con 5xx: errores del servidor, un error al procesar la solicitud. 

//Los mas utilizados: 

//200 = Ok, la petición fue exitosa. 
//400 = bad request, la peticion no pudo ser entendida. 
//401 = unauthorized. Acceso no autorizado
//403 = Forbidden. El servidor no puede responder la solicitud del cliente, porque sus credenciales no tiene autorizacion. 
//404 = Not found = Recurso no encontrado. 
//500 = Internal Server Error: Error interno del servidor. 

//2) ¿Que es una API?
//Significa "Interfaz de Programación de Aplicaciones" o en Inglis "Application Programming Interface".
//Es un conjunto de definiciones y reglas que permiten que dos equipos puedan integranse para trabajar juntos. 

//Rest: nos permite definir la estructura que deben tener los datos para poder transferirse. 

//Los dos formatos más comunes. 
//JSON. 
//XML. 

//3) API REST: un modelo completo para tener perfectamente estipulados los protocolos, las reglas, incluso la estructura de la información, con el fin de poder hacer un sistema de comunicación completo entre las computadoras. 

//a) Protocolo cliente- servidor sin estado. 
//b) Cacheable. 
//c) Operaciones comunes. 
//d) Interfaz uniforme. 
//e) Utilización de hipermedios. 

//Metodos de las peticiones: 
//Repasamos GET: 

const express = require("express");
const app = express();
const PUERTO = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Array de clientes: 
const clientes = [
    { id: "1", nombre: "Lionel", apellido: "Messi" },
    { id: "2", nombre: "Lautaro", apellido: "Martinez" },
    { id: "3", nombre: "Fideo", apellido: "Di Maria" },
]

//Rutas

app.get("/", (req, res) => {
    res.send(clientes);
})


//Ejemplo: que me traiga un solo id: 

app.get("/:id", (req, res) => {
    let { id } = req.params;

    const buscado = clientes.find(cliente => cliente.id == id);

    if (buscado) {
        return res.send(buscado);
    } else {
        return res.send("No se encuentra el cliente con ese ID");
    }

})

//Ruta POST para generar nuevos clientes: 

app.post("/", (req, res) => {
    //Voy a recibir datos de Postman y voy a crear un nuevo "cliente".
    const clienteNuevo = req.body;

    //Luego de crearlo, lo voy a pushear. 
    clientes.push(clienteNuevo);

    //Verifico por consola que todo este bien: 
    console.log(clientes);

    res.send({ status: "succes", message: "Cliente creado" });
})

//La ruta PUT /:id deberá tomar un cliente y actualizarlo por los campos enviados desde el body. NO BORREN el id al actualizar. 

app.put("/:id", (req, res) => {
    let { id } = req.params;
    let { nombre, apellido } = req.body;

    //Voy a buscar el indice del cliente en el array con el id que levanto de los parametros. 

    let clienteIndex = clientes.findIndex(cliente => cliente.id === id);

    if (clienteIndex !== -1) {
        //Si existe, le modifico los campos: 
        clientes[clienteIndex].nombre = nombre;
        clientes[clienteIndex].apellido = apellido;

        console.log(clientes);
        res.send({ status: "succes", message: "Cliente actualizado" });
    } else {
        //Si el cliente no se encuentra que retorne un mensaje. 

        res.status(404).send({ status: "error", message: "Cliente no encontrado" });
    }
})

//La ruta DELETE /:id debera eliminar el cliente con el id indicado. 

app.delete("/:id", (req, res) => {
    let { id } = req.params;

    //Voy a buscar el indice del cliente: 
    let clienteIndex = clientes.findIndex(cliente => cliente.id === id);

    if (clienteIndex !== -1) {
        //Si existe, lo elimino del array: 
        clientes.splice(clienteIndex, 1);

        console.log(clientes);

        res.send({ status: "success", message: "Cliente eliminado" });
    } else {
        //Si el cliente no lo encuentra, que tire un mensaje. 
        res.status(404).send({ status: "error", message: "Cliente no encontrado" })
    }
})

//Listen
app.listen(PUERTO);
