import express from "express";
const router = express.Router();
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
import passport from "passport";
import generateToken from "../utils/jsonwebtoken.js";

//Registro: 

// router.post("/", async (req, res) => {
//     const { first_name, last_name, email, password, age } = req.body;

//     try {
//         //Verificamos si el correo que recibo ya esta en la bd. 
//         const existeUsuario = await UserModel.findOne({ email: email });
//         if (existeUsuario) {
//             return res.status(400).send("El correo electronico ya esta registrado");
//         }

//         //Creamos un nuevo usuario: 
//         const nuevoUsuario = await UserModel.create({ first_name, last_name, email, password: createHash(password), age });

//         //Armamos la session: 
//         req.session.login = true;
//         req.session.user = { ...nuevoUsuario._doc }

//         //res.status(200).send("Usuario creado con éxito!");
//         res.redirect("/profile");

//     } catch (error) {
//         res.status(500).send("Error interno del servidor")
//     }
// })

// //Login: 

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const usuario = await UserModel.findOne({ email: email });
//         if (usuario) {
//             //if(usuario.password === password) {
//             if (isValidPassword(password, usuario)) {
//                 req.session.login = true;
//                 req.session.user = {
//                     email: usuario.email,
//                     age: usuario.age,
//                     first_name: usuario.first_name,
//                     last_name: usuario.last_name
//                 }
//                 res.redirect("/profile");
//             } else {
//                 res.status(401).send("Contraseña no valida, moriras!");
//             }

//         } else {
//             res.status(404).send("Usuario no encontrado");
//         }

//     } catch (error) {
//         res.status(500).send("Error interno del servidor")
//     }

// })

//VERSION PARA PASSPORT: 

//Registro: 

// router.post("/", passport.authenticate("register", {
//     failureRedirect: "/api/sessions/failedregister"
// }), async (req, res) => {

//     if(!req.user) return res.status(400).send("Credenciales invalidas");

//     req.session.user = {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         age: req.user.age,
//         email: req.user.email
//     };

//     req.session.login = true; 

//     res.redirect("/profile");
// })

// //Nos vamos a comer. 

// router.get("/failedregister", (req, res) => {
//     res.send("Registro fallido");
// })


// //Login. 

// router.post("/login", passport.authenticate("login", { failureRedirect:"/api/sessions/faillogin"}), async (req, res) => {
//     if(!req.user) return res.status(400).send("Credenciales invalidas");
    
//     req.session.user = {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         age: req.user.age,
//         email: req.user.email
//     };

//     req.session.login = true; 

//     res.redirect("/profile");

// })

// router.get("/faillogin", async (req, res) => {
//     res.send("Fallo todooo, revisa el codigo");
// })

// //Logout

// router.get("/logout", (req, res) => {
//     if (req.session.login) {
//         req.session.destroy();
//     }
//     res.redirect("/login");
// })

// //Version para GitHub: 

// router.get("/github", passport.authenticate("github", {scope: ["user:email"]}), async (req, res) => {})

// router.get("/githubcallback", passport.authenticate("github", {failureRedirect:"/login"}), async (req, res) => {
//     //La estrategia de GitHub nos retornará el usurio, entonces lo agregamos a nuestro objeto de session: 
//     req.session.user = req.user;
//     req.session.login = true;
//     res.redirect("/profile");
// })

//Version con JSON WEB TOKEN: 

//Registro: 

router.post("/", async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body; 

    try {
        const existeUsuario = await UserModel.findOne({email});
        if(existeUsuario) {
            return res.status(400).send("El email ya esta registrado");
        }

        //Creamos un nuevo usuario: 
        const nuevoUsuario = await UserModel.create({first_name, last_name, email, password:createHash(password), age});

        //Generamos el token: 
        const token = generateToken({id: nuevoUsuario._id});

        res.status(200).send({status:"success", message: "Usuario creado con exito",token});
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

//Login: 

router.post("/login", async (req, res) => {
    const {email, password} = req.body; 

    try {

        const usuario = await UserModel.findOne({email});
        if(!usuario) {
            return res.status(400).send("Y ese usuario de donde salio? ");;
        }

        if(!isValidPassword(password, usuario)) {
            return res.status(401).send("Credenciales invalidas");
        }

        //Si la contraseña es correcta, generamos el token. 

        const token = generateToken({
            first_name: usuario.first_name,
            last_name: usuario.last_name,
            email: usuario.email,
            id: usuario._id
        })

        res.status(200).send({status:"success", message: "Login exitoso!!",token});

    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

router.get("/logout", (req, res) => {
        if (req.session.login) {
            req.session.destroy();
        }
        res.redirect("/login");
    })

export default router; 