//Chai es una libreria de assertions, la cual no permitira realizar comparaciones de test mas claras. 

//Instalamos como dependencia de desarrollo: npm install -D chai

import mongoose from "mongoose";
import User from "../src/dao/Users.dao.js"; 
import chai from "chai"; 

const expect = chai.expect; 

//Me conecto a mi Base de datos: 

mongoose.connect("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/Adoptame?retryWrites=true&w=majority&appName=Cluster0")

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
        //assert.strictEqual(Array.isArray(resultado), true)
        expect(Array.isArray(resultado)).to.be.true;
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
        //assert.ok(resultado._id); 
        expect(resultado).to.have.property("_id");

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
        //assert.deepStrictEqual(resultado.pets, []);
        expect(resultado.pets).to.deep.equal([]);
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

        //assert.strictEqual(typeof user, "object"); 
        expect(user).to.be.an("object");
    })

    after(async function() {
        await mongoose.disconnect();
    })
})


