/** CLASE 3 - MANEJO DE ARCHIVOS Y NPM   **/

//Temas de hoy: 

//1) File System. 
//2) Manejo de archivos de forma sincrónica.
//3) Manejo de archivos con callbacks. 
//4) Manejo de archivos con promesas. 
//5) Manejo de datos complejos. 
//6) Practica y desafio nuevo. 

////////////////////////////////////////////////////////

//1) File System: es un manejador de archivos que ya viene incorporado en Node JS. 
//Me permite realizar las operaciones de Crear, Leer, Actualizar y Eliminar datos ( CRUD ).

//Primer paso: tenemos que importar el módulo. 

const fs = require("fs");

//console.log(fs); 
//Si quiero verificar toda la info que me trae el módulo lo puedo ver por consola. 

//2) Trabajamos de forma sincrónica: 

const rutaSin = "./ejemplo-sin.txt";

//Crear un archivo: 

fs.writeFileSync(rutaSin, "Hola comisión, estamos trabajando en un ejemplo sincronico");

//Leer un archivo: 

//let contenido = fs.readFileSync(rutaSin, "utf-8");
//Primer parametro la ruta del archivo, segundo la codificación, nosotros usamos "utf-8". 
//Esto me retorna el texto almacenado en ejemplo-sin.txt y lo voy a guardar en la variable contenido. 
//console.log(contenido);

//Recomendado, verificar primero si el archivo existe: 

// if(fs.existsSync(rutaSin)) {
//     let respuesta  = fs.readFileSync(rutaSin, "utf-8");
//     console.log(respuesta);
// } else {
//     console.log("No existe el archivo, vamos a morir ahhh!!");
// }


//Actualizar contenidos: 

fs.writeFileSync(rutaSin, "Hola, estamos actualizando la info");
//Para actualizar, simplemente tengo que pisar el contenido. 

//Puedo agregar más contenido al final: 

fs.appendFileSync(rutaSin, " y este es un texto \n agregado al final");
//\n gemera un salto de linea.

//Eliminar 

fs.unlinkSync(rutaSin);

//3) Manejo de archivos con callbacks. 

const conCall = "./ejemplo-con.txt";


//Crear archivo: 

fs.writeFile(conCall, "Hola, estamos trabajando con callbacks ahora", (error) => {
    //El tercer parametro del cb, es el error para utilizar en caso de que ocurra. 
    if( error ) return console.log("No pudimos crear el archivo");

    //Leer el archivo: 
    fs.readFile(conCall, "utf-8", (error, contenido) => {
        if(error) return console.log("No podemos el leer el archivo");
        console.log(contenido);
        //Acá el cb tiene 2 parametros, uno el error, segundo el contenido del archivo.

        //y si queremos agregar mas info: 

        fs.appendFile(conCall, " acá metemos más contenido", (error) => {
            if( error ) return console.log("No se puede agregar mas contenido");

            //Y si lo quiero eliminar: 
            fs.unlink(conCall, (error) => {
                if( error ) return console.log("No podemos eliminarlo");
            })
        })
    })
})

//4) Manejo de archivos con promesas.

//Para poder trabajar con promesas, tenemos que usar la propiedad "promises" del módulo fs. 

const textoPromises = "./texto-pro.txt";

const operacionesAsincronica =  async () => {

    //Crear un archivo: 
    await fs.promises.writeFile(textoPromises, "Nuevo archivo!");

    //Leer un archivo: 
    let respuesta = await fs.promises.readFile(textoPromises, "utf-8");
    console.log(respuesta);

    //Agregamos mas contenido: 
    await fs.promises.appendFile(textoPromises, " en un ratito nos vamos a comer");

    //releer!: 
    respuesta = await fs.promises.readFile(textoPromises, "utf-8");
    console.log(respuesta);

    //Lo eliminamos: 
    await fs.promises.unlink(textoPromises);
}

//No se olviden de invocar a la función: 

operacionesAsincronica();

//5) Manejo de datos complejos.

//Desarrollamos un array de personas: 

const arrayPersonas = [
    {nombre: "Pepe", apellido: "Argento", edad: 50},
    {nombre: "Moni", apellido: "Argento", edad: 38},
    {nombre: "Paola", apellido: "Argento", edad: 17},
    {nombre: "Coky", apellido: "Argento", edad: 15},
    {nombre: "Fatiga", apellido: "Argento", edad: 7}
]

const archivoArgento = "./archivo-argento.json";

const guardarArchivos = async () => {
    await fs.promises.writeFile(archivoArgento, JSON.stringify(arrayPersonas, null, 2));
}

guardarArchivos();

//Como leemos estos archivos: 

const leerArchivos = async () => {
    const respuesta = await fs.promises.readFile(archivoArgento, "utf-8");
    const arrayNuevo = JSON.parse(respuesta);
    console.log(arrayNuevo);
}

leerArchivos();