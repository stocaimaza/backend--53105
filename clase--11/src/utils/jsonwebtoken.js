//Instalamos: npm i jsonwebtoken

//Importamos el módulo: 
import jwt from "jsonwebtoken";

const private_key = "palabrasecretaparatoken";

const generateToken = (user) => {
    const token = jwt.sign(user, private_key, {expiresIn: "24h"});
    //Le podemos colocar una fecha de expiración: 
    return token; 
}

export default generateToken;