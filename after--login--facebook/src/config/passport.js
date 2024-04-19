const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy; 
const UsuarioModel = require("../models/usuario.js"); 

const initializePassport = ( ) => {
    passport.use(new FacebookStrategy({
        clientID: 1116629166045627,
        clientSecret: "9a64a0466f59a6c6d672a99a6ac71e3b", 
        callbackURL: "http://localhost:8080/auth/facebook/callback",
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        const user = await UsuarioModel.findOne({
            accountId: profile.id, 
            provider: "Facebook"
        });

        if(!user) {
            console.log("Agregando un nuevo usuario a la Base de Datos");

            const newUser = new UsuarioModel({
                first_name: profile.displayName,
                accountId: profile.id,
                provider: "Facebook"
            });

            await newUser.save(); 
            return done(null, profile);
        } else {
            console.log("El usuario ya existe");
            return done(null, profile);
        }
    }))

    //Serializar y deserializar el usuario
    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user, done) => {
        done(null, user);
    })
}

module.exports = initializePassport;