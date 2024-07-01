import mongoose from "mongoose";

import assert from "assert";
//Módulo nativo de Node JS que nos permite hacer las validaciones. 

//Me traigo el DAO de usuarios. 
import User from "../src/dao/Users.dao.js";

//Me conecto a mi Base de datos: 
mongoose.connect("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/Adoptame?retryWrites=true&w=majority&appName=Cluster0")

//DESCRIBE: es una función que me permite agrupar un conjunto de pruebas relacionadas bajo el mismo bloque descriptivo. 

describe("Testeamos el DAO de Usuarios", function () {
    //Le asignamos un nombre o titulo. 
    //Pasamos una función callback que contiene todas las pruebas individuales. 

    //Acá utilizamos un "before", esto se ejecuta una vez antes de las pruebas: 
    before(function() {
        this.usersDao = new User();
    })


    //LIMPIAMOS LA BASE DE DATOS CADA VEZ QUE TESTEAMOS: 

    beforeEach(async function() {
        await mongoose.connection.collections.users.drop();
        //Si le quiero dar un tiempo máximo para completar la operacion podemos colocar un "this.timeout(5000)"
    }) 

    //En el "it" describimos lo que se espera del test. 
    it("El GET de usuarios me debe retornar un array ", async function() {
        const resultado = await this.usersDao.get(); 
        assert.strictEqual(Array.isArray(resultado), true)

    })

    //TEST 1: 
    it("El DAO debe poder agregar un usuario a la Base de Datos", async function () {
        let usuario = {
            first_name: "Mitha", 
            last_name: "Legrand", 
            email: "lachiqui@legrand.com", 
            password: "1234"
        }

        const resultado = await this.usersDao.save(usuario); 
        //Aca verificamos con assert: 
        assert.ok(resultado._id); 

    })

    //TEST 2: 
    it("Validamos que el usuario tenga un array de mascotas vacio", async function () {
        let usuario = {
            first_name: "Mitha", 
            last_name: "Legrand", 
            email: "lachiqui@legrand.com", 
            password: "1234"
        }

        const resultado = await this.usersDao.save(usuario); 
        //Aca verificamos con assert: 
        assert.deepStrictEqual(resultado.pets, []);
    })

    //TEST 3: 
    it("El DAO puede obtener un usuario por email ", async function() {
        let usuario = {
            first_name: "Goldie", 
            last_name: "Legrand", 
            email: "goldie@legrand.com", 
            password: "1234"
        }

        await this.usersDao.save(usuario); 

        const user = await this.usersDao.getBy({email: usuario.email}); 

        assert.strictEqual(typeof user, "object"); 
    })

    after(async function() {
        await mongoose.disconnect();
    })
})