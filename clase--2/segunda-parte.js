/* 2 BLOQUE - PROGRAMACIÓN SINCRÓNICA Y ASINCRÓNICA */

//Temas: 

// 1) Enfoque sincrónico y asincrónico
// 2) Callback
// 3) Promesas
// 4) Async Await

///////////////////////////////////////////

//1) Enfoque sincrónico.
//Las tareas se ejecutan de forma secuencial y cada tarea es bloqueante de la siguiente. 

console.log("Primero");
console.log("Segundo");
console.log("Tercero");

//Ejemplo con funciones:

function a() {
    console.log("1");
    b();
}

function b() {
    console.log("2");
    c();
}

function c() {
    console.log("3");
}

a();

//Programación asincrónica:
//En este enfoque las tareas se ejecutan en segundo plano y no bloquean la ejecución de la siguiente tarea. 
//Entonces cuando estoy haciendo una petición a una API, no voy a bloquear mi código mientras espero que la petición se complete. 

//Para simular una petición a una API, vamos a usar el método setTimeout. 

setTimeout(() => {
    console.log("Primer tareaaaa");
}, 3000)

setTimeout(()=> {
    console.log("Segunda tarea, hace calooor");
}, 1500)


//2) CallBack: es una función  que pasamos como parametro a otra función. 

//¡Ojo! A no confundir con las FOS. Una FOS es una función que recibe  por parámetro una función o que retorna después de su ejecución una función. 


//Ejemplo: 

function suma(numA, numB, callback) {
    let resultado = numA + numB;
    callback(resultado);
    
}

function mostrarResultado(resultado) {
    console.log("El resultado de la operación es: " + resultado);
}

suma(10,5,mostrarResultado);

//Ejemplo con el método map: 

let numeros = [1,2,3,4,5];
const numerosDuplicados = numeros.map( numero => numero * 2);
console.log(numerosDuplicados);

function mapear(array, callback) {
    let nuevoArray = [];
    for(let i = 0; i < array.length; i++) {
        nuevoArray.push(callback(array[i]));
    }
    return nuevoArray; 
}

function duplicar(numero) {
    return numero * 2;
}

console.log("Nueva función map ind. nacional: " + mapear(numeros, duplicar));

//3) Promesas: son objetos que representan un hecho eventual a futuro. 

//Las promesas tienen 3 estados: 
//pendiente (pending): estado inicial de la promesa. 
//exitosa: (fulfiled): la operación se completó correctamente. 
//fallida: (rejected) : la operación falló y se rechazó la promesa. 



//Creación de una promesa: 
//Para crear una promesa, debemos instanciar la clase Promise y pasarle como argumento una función que recibe dos parámetros: resolve y reject. Esto es un callback. 

const promesa = new Promise((resolve, reject) => {
    //Acá va el código que queremos ejecutar. 

    //resolve y reject son funciones que nos provee la promesa para indicarle el estado de la misma. 
    let estado = true; 
    if(estado) {
        resolve("Exito en la promesa");
    } else {
        reject("Error en la promesa, no se cumple");
    }
})

console.log(promesa);

//Métodos then y catch: 

//Then: recibe como argumento una función que se va a ejecutar cuando la promesa se resuelva exitosamente. 
//Catch: Recibe como argumento una función que se va a ejecutar cuando la promesa se rechace. 
//Finally: llega en ES8, se ejecuta siempre, sin importar el exito o rechazo de la promesa. 

promesa
    .then(() => console.log("Estamos en el then, exito total!"))
    .catch(() => console.log("Se nos rechazooo todo, vamos a morir") )
    .finally(() => console.log("Fin del proceso!"))

//Practicamos con un array de datos: 

const productos = [
    {id:1, nombre: "Mesa", precio: 5000},
    {id:2, nombre: "Silla", precio: 1000},
    {id:3, nombre: "Lampara", precio: 3000},
    {id:4, nombre: "Televisor", precio: 8000}
]

//Voy crear una promesa que me devuelva un producto por su id: 

function buscarProductoPorId(id) {
    return new Promise((resolve, reject) =>  {
        setTimeout( () => {
            const producto = productos.find(item => item.id === id);

            if(producto) {
                resolve(producto)
            } else {
                reject("No existe ese producto, vamos a morir");
            }
        }, 1000)
    })
}


//Vamos a llamar a la promesa: 

buscarProductoPorId(14)
    .then(producto => console.log(producto))
    .catch(error => console.log(error))

//4) Async Await

//Con la palabrita await genero una pausa en la ejecución del código hasta que la promesa se resuelva o se rechace. 
//Peeero, para poder usar el await, la función donde se lo use deber ser async. 

async function buscarProductoPorIdAsync(id) {
    const producto =  await buscarProductoPorId(id); 
    console.log(producto);
}

buscarProductoPorIdAsync(3);

//Generalmente se usa en conjunto con try catch. 

async function buscarProductoPorIdAsyncNuevo(id) {
    try {
        const producto = await buscarProductoPorId(id)
        console.log(producto);
    } catch (error) {
        console.log(error)
    }
}

buscarProductoPorIdAsyncNuevo(4);



//Me conecto a una API: 

fetch("https://jsonplaceholder.typicode.com/users")
    .then(respuesta => respuesta.json())
    .then(usuarios => console.table(usuarios))
    .catch(error => console.log("Error en la dire, fijate que haces", error))


//La misma petición pero ahora con async await: 

async function pedirUsuarios() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
    const usuarios = await respuesta.json();
    console.log(usuarios);
}


pedirUsuarios();
