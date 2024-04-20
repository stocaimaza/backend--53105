//Importamos los módulos: 
import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse",
        //Misma palabra secreta que usaste en la app. guarda! ojo! 
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))
}

//Creamos la Cookie Extractor:

const cookieExtractor = (req) => {
    let token = null; 
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"];
        //Si hay cookie la recupero.
    }
    return token;
}


export default initializePassport;