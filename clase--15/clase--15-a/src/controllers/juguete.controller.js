//Acá traemos el DAO. 
//SIN FACTORY: 

// import MemoryJugueteDao from "../dao/memoryJugueteDao.js";
// import MongoJugueteDao from "../dao/mongoJugueteDao.js";
// import FileSystemJugueteDao from "../dao/filesystemJugueteDao.js";
//const jugueteService = new MemoryJugueteDao(); 
//const jugueteService = new MongoJugueteDao(); 
//const jugueteService = new FileSystemJugueteDao();

//CON FACTORY: 

import DAO from "../dao/factory.js";
const jugueteService = new DAO(); 
import JugueteDTO from "../dto/juguete.dto.js";


class JugueteController {
    async crearJuguete(req, res) {

        const {nombre, categoria, precio} = req.body;

        try {

         //const juguete = await jugueteService.crearJuguete(req.body); 

         const jugueteDTO = new JugueteDTO(nombre, categoria, precio);

         await jugueteService.crearJuguete(jugueteDTO); 

         res.json(jugueteDTO);

        } catch (error) {

            res.status(500).send("Error del servidor"); 

        }
    }

    async obtenerJuguetes(req, res){
        try {

            const juguetes = await jugueteService.obtenerJuguetes(); 
            res.json(juguetes);

        } catch (error) {

            res.status(500).send("Error del servidor"); 

        }
    }
}

export default JugueteController;