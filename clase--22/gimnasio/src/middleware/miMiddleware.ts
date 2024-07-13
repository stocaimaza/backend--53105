//1) Importamos nestMiddleware: 
import { NestMiddleware } from "@nestjs/common";

//Importamos algunas herramientas de Express: 
import { Request, Response, NextFunction} from "express"; 

export default class MiMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`${req.method} a la ruta ${req.url}`); 
        next(); 
    }
}