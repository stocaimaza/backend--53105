import JuguetesModel from "../models/juguete.model.js";

class MongoJugueteDao {
    async crearJuguete(datosJuguete) {
        try {
            const juguete = new JuguetesModel(datosJuguete);
            return await juguete.save(); 
        } catch (error) {
            throw new Error("Error al crear un juguete en MongoDB");
        }
    }

    async obtenerJuguetes(){
        try {
            const juguetes = await JuguetesModel.find(); 
            return juguetes; 
        } catch (error) {
            throw new Error("Error al obtener los juguetes de MongoDB");
        }
    }
}


export default MongoJugueteDao;