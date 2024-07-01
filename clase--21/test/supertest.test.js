//Ahora voy a realizar una prueba integral de la app, entonces no necesito traer un DAO en particular. 

//Tengo que importar el módulo de "supertest":

import supertest from "supertest";

//Importamos chai, recuerden que es una libreria de aserciones para node js. 
import chai from "chai";

const expect = chai.expect;

//Vamos a crear el "requester", quien se encarga de hacer las peticiones al servidor. 

const requester = supertest("http://localhost:8080");

//Ahora vamos a trabajar con dos "describe". Uno hace referencia a la aplicacion "Adoptame" y en el otro para cada entidad. 

describe("Testing de la App Web Adoptame", () => {
    describe("Testing de Mascotas:  ", () => {
        it("Endpoint POST /api/pets debe crear una mascota correctamente", async () => {
            //Voy a crear un mock de una mascota: 

            const pichichoMock = {
                name: "Firulais",
                specie: "Pichico",
                birthDate: "2021-03-10"
            }

            //En cada prueba yo puedo recibir el ok, statusCode, _body
            const { statusCode, ok, _body } = await requester.post("/api/pets").send(pichichoMock);

            //Mostramos los datos que recibimos por consola: 
            console.log(statusCode);
            console.log(ok);
            console.log(_body);

            //Y ahora evaluamos, si el payload que me envian tiene _id. 
            expect(_body.payload).to.have.property("_id");
        })

        it("Al crear una mascota solo con los datos elementales, la mascota creada debe tener la propiedad adopted con el valor false", async () => {

            const nuevaMascota = {
                name: "Rex",
                specie: "Perrito",
                birthDate: "2021-01-01"
            }

            const { statusCode, body } = await requester.post("/api/pets").send(nuevaMascota);

            expect(statusCode).to.equal(200);
            expect(body.payload).to.have.property("adopted").that.equals(false);

        })

        it("Si se desea crear una mascota sin el campo  nombre, el módulo debe responder con un status 400.", async () => {

            const mascotaSinNombre = {
                specie: "Gato",
                birthDate: "2020-05-15"
            };


            const { statusCode } = await requester.post("/api/pets").send(mascotaSinNombre);

            expect(statusCode).to.equal(400);
        })

        it("Al obtener a las mascotas con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo", async () => {
            const {statusCode, body} = await requester.get("/api/pets"); 

            expect(statusCode).to.equal(200);
            //expect(body).to.have.property("payload").that.is.an("array"); 
            expect(body.payload).that.is.an("array");
        })

        it("El método PUT debe poder actualizar correctamente a una mascota determinada (esto se puede testear comparando el valor previo con el nuevo valor de la base de datos).", async () => {
            //Supongamos que ya tenemos el id de una mascota existente en mi base de datos:
            const idMascotaExistente = "6680432b55cfc28922f50e56"; 

            const datosActualizados = {
                name: "Perrito",
                specie: "Perro"
                //Agregan cualquier campo que deseen actualizar
            }

            const { statusCode } = await requester.put(`/api/pets/${idMascotaExistente}`).send(datosActualizados); 

            expect(statusCode).to.equal(200);
        })

        it("El método DELETE debe poder borrar la última mascota agregada, ésto se puede alcanzar agregando a la mascota con un POST, tomando el id, borrando la mascota  con el DELETE, y luego corroborar si la mascota existe con un GET", async () => {
            //Paso 1: Agrego una nueva mascota: 

            const nuevaMascota = {
                name: "Mascota a borrar", 
                specie: "Iguana", 
                birthDate: "2023-02-20"
            }; 

            //Paso 2: enviamos la nueva mascota
            const {body: {payload: { _id }}} = await requester.post("/api/pets").send(nuevaMascota); 

            //Paso 3: borramos la mascota agregada 
            const {statusCode} = await requester.delete(`/api/pets/${_id}`); 

            expect(statusCode).to.equal(200);

        })

    })
    //EJERCICIO 2: REGISTRO DE USUARIOS: 

    describe("Test avanzado", () => {
        //Declarar de forma global una variable cookie que la vamos a usar para las pruebas: 
        let cookie; 

        it("Debe registrar correctamente un usuario", async () => {
            const mockUsuario = {
                first_name: "Pepe", 
                last_name: "Argento", 
                email: "pepe@zapateriagarmendia.com",
                password: "1234"
            }

            const {_body} = await requester.post("/api/sessions/register").send(mockUsuario); 

            //Validamos que tenga un payload: 
            expect(_body.payload).to.be.ok; 
        })

        it("Debe loguear correctamente al usuario y recuperar la cookie", async () => {
            //Enviamos al login los mismos datos que registramos en el paso anterior: 

            const mockUsuario = {
                email: "pepe@zapateriagarmendia.com",
                password: "1234"
            }

            const resultado = await requester.post("/api/sessions/login").send(mockUsuario); 

            //Ahora me guardo los header de la peticion y recupero el token para almacenarlo en la variable cookie. 

            const cookieResultado = resultado.headers['set-cookie']['0']; 

            //Verificamos que la cookie recuperada exista: 
            expect(cookieResultado).to.be.ok; 

            //Separamos el nombre y el valor de la cookie recuperada: 

            cookie = {
                name: cookieResultado.split("=")['0'], 
                value: cookieResultado.split("=")['1']
            }

            //Verificamos que el nombre de la cookie sea correcto: 
            expect(cookie.name).to.be.ok.and.eql("coderCookie");
            expect(cookie.value).to.be.ok;

        })

        //ultimo paso, probamos la ruta current: 
        it("Debe enviar la cookie que contiene el usuario", async () => {

            const {_body} = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`]); 

            //Verificamos que en ese body se nos retorne el email: 
            expect(_body.payload.email).to.be.eql("pepe@zapateriagarmendia.com");

        })
    })

    //TESTING CON CARGA DE IMAGENES: 

    describe("Testeamos la carga de imagenes", () => {
        it("Subimos el CoderGato", async () => {
            const coderGato = {
                name: "CoderGato", 
                specie: "Michi", 
                birthDate: "2021-06-01"
            }

            const resultado = await requester.post("/api/pets/withimage")
                .field("name", coderGato.name)
                .field("specie", coderGato.specie)
                .field("birthDate", coderGato.birthDate)
                .attach("image", "./test/codergato.webp"); 

            //Verificamos que la peticion resulto ok: 
            expect(resultado.status).to.be.eql(200); 

            //Verificamos que la mascota tenga el campo id: 
            expect(resultado._body.payload).to.have.property("_id");

            //Verificamos que la mascota tenga la imagen: 
            expect(resultado._body.payload.image).to.be.ok;
        })
    })
})