//4) Creando un Custom Router: 

import express from "express";
const router = express.Router(); 

class Router {
    constructor() {
        this.router = router; 
        this.init(); 
    }

    getRouter() {
        return this.router; 
    }

    get(path, ...callbacks) {
        //El primer argumento es la ruta. 
        //Los siguientes argumentos son los callbacks que se ejecutaran cuando se haga get en la ruta determinada. 
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callbacks));
    }

    applyCallbacks(callbacks) {
        //Aplicar los callbacks a la ruta
        //Para lograr esto vamos a crear una función async que envuelve cada callback proporcionado
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this,params);
            } catch (error) {
                console.log(error);
                params[1].status(500).send(error)
            }
        })
    }

    //Custom responses: 

    generateCustomResponse(req, res, next) {
        res.sendSuccess = payload => res.send({status:"success", payload});
        res.sendServerError = error => res.status(500).send({status:"error", error});
        res.sendUserError = error => res.status(400).send({status:"error", error});
        next();
    }

}

export default Router;