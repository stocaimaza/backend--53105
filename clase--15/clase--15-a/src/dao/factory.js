import mongoJugueteDao from "./mongoJugueteDao.js";
import memoryJugueteDao from "./memoryJugueteDao.js";
import filesystemJugueteDao from "./filesystemJugueteDao.js";
import config from "../config/config.js";
let DAO;

switch (config.persistence) {
    case "mongo":
        DAO = mongoJugueteDao;
        break;
    case "memory":
        DAO = memoryJugueteDao;
        break;
    case "file":
        DAO = filesystemJugueteDao;
        break;
    default:
        throw new Error("Persistencia no valida, fijate que escribiste en el archivo .env");
}

export default DAO;

