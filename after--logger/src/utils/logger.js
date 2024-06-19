import winston from "winston";
import configObject from "../config/config.js";
const {node_env} = configObject; 

//Vamos a armar nuestro propio sistema de niveles. 

const niveles = {
    fatal: 0,
    error: 1, 
    warning: 2,
    info: 3,
    http: 4, 
    debug: 5
}

//Logger para desarrollo: 
const loggerDesarrollo = winston.createLogger({
    levels: niveles,
    transports: [
        new winston.transports.Console({
            level: "debug"
        })
    ]
})


//Logger para produccion: 
const loggerProduccion = winston.createLogger({
    levels: niveles, 
    transports: [
        new winston.transports.Console({
            level: "info"
        }),
        //Agregamos el archivo: 
        new winston.transports.File({
            filename: "./errors.log",
            level: "error"
        })
    ]
})

//Determinar que lugar utilizar. 
const logger = node_env == "produccion" ? loggerProduccion : loggerDesarrollo;

//Middleware
const addLogger = (req, res, next) => {
    req.logger = logger; 
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next();
}


export default addLogger;
