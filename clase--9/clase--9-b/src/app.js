/** MONGO AVANZADO 2  **/

//Temas:

//1) Aggregations
//2) Paginacion

/////////////////////////// AGGREGATIONS ///////////////////////////////////

//Es un proceso que consiste en realizar múltiples operaciones en una sola consulta. 
//Estas operaciones pueden ser de varios tipos, consultas de datos, ordenamientos, modificación. etc. 

//¿Cómo funciona? 

//Las agregaciones consisten en un conjunto de pasos(stages). Cada paso corresponde a una operación a realizar. 
//[{stage1}, {stage2}, {stage3}]

import mongoose from "mongoose";
import OrderModel from "./models/order.js";

const main = async () => {
    await mongoose.connect("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/Pizza?retryWrites=true&w=majority&appName=Cluster0")


    //Ejercicio 1: Nos piden que calculemos el total de las pizzas vendidas por sabor pero solo en tamaño familiar. 

    /*
    const resultado = await OrderModel.aggregate([
        {
            $match: {
                tam: "familiar"
            }
        },
        {
            $group: {
                _id: "$nombre", 
                total: {
                    $sum: "$cantidad"
                }
            }
        },

        //Ejercicio 2: Nos piden mas datos y que los guardemos en una nueva colección. 

        {
            $sort: {
                total: -1
                //-1 : Descendente 
                //1 : Ascendente
            }
        },
        {
            $group: {
                _id: 1,
                orders: {
                    $push: "$$ROOT"
                    //$push indica que se guardan los resultados en un array y $$ROOT hace referencia al documento actual.
                }
            }
        },
        {
            $project: {
                _id: 0,
                orders: "$orders"
                //Acá le decimos que el campo "orders" va a ser igual al os resultados que guardamos en el paso anterior. 
            }
        }, 
        //Ultimo paso super importante, hacemos el merge de los resultados en una nueva colección: 
        {
            $merge: {
                into: "reports"
            }
        }
    ])

    console.log(resultado);
    */
    //Paginacion: 

    // const resultado = await OrderModel.paginate({"tam": "familiar"}, {limit: 2, page: 2});
    // console.log(resultado);


}

//main();


///////////////////////////////////// PAGINACION ////////////////////////////////////

//La paginación es un proceso que consiste en dividir los resultados de una consulta en bloques de datos. 

//Instalamos la dependencia: npm install mongoose-paginate-v2

//RECORDATORIO: NO TENEMOS CLASES EL 30 DE MARZO. 

//Ejemplo con Express: 

import express from "express";
const app = express();
const PUERTO = 8080; 
import exphbs from "express-handlebars";
import "./database.js";

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas

app.get("/pizzas", async (req, res) => {
    const page = req.query.page || 1;
    const limit = 2; 

    try {
        const pizzasListado = await OrderModel.paginate({}, {limit, page});

        //Recuperamos los docs: 

        const pizzasResultadoFinal = pizzasListado.docs.map( pizza => {
            const {_id, ...rest} = pizza.toObject();
            return rest; 
        })

        res.render("pizzas", {
            pizzas: pizzasResultadoFinal, 
            hasPrevPage: pizzasListado.hasPrevPage,
            hasNextPage: pizzasListado.hasNextPage,
            prevPage: pizzasListado.prevPage,
            nextPage: pizzasListado.nextPage,
            currentPage: pizzasListado.page,
            totalPages: pizzasListado.totalPages
        })
    } catch (error) {
        res.status(500).send("Error en el servidor, vamos a morir todos");
    }
})


//Listen

app.listen(PUERTO, () => {
    console.log(`Escuchando el puerto 8080`);
})
