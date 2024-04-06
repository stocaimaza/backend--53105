import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import exphbs from "express-handlebars";
const app = express(); 
const PUERTO = 8080; 
import "./database.js";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
//Cambios con Passport: 
import passport from "passport";
import initializePassport from "./config/passport.config.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware de Session: 
app.use(session({
    secret:"secretCoder",
    resave: true,
    //Esta configuración me permite mantener activa la sesion frente a la inactividad del usuario. 

    saveUninitialized: true,
    //Me permite guardar cualquier sesión aun cuando el objeto de sesion no tenga nada para contener. 

    //3)Utilizando Mongo Store
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })
}))
//Cambios con Passport: 
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Rutas

app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);


//Listen
app.listen(PUERTO, ()=> {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})
