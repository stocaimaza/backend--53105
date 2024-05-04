//Instalamos con npm i dotenv
import dotenv from "dotenv";

dotenv.config(); 

const config = {
    persistence: process.env.PERSISTENCE || "mongo" //Opción por defecto. 
}

export default config; 


