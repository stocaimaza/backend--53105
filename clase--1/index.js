/*TIPOS DE DATOS EN JS */

//DATO = unidad mínima de información. 

//1) TIPOS DE DATOS
//Los podemos en dos categorias: primitivos y objeto

//1.1 Primitivos: 

//Tipo number

45648
4564.12

//Datos numericos que pueden ser enteros o decimales. Y los decimales tambien pueden recibir el nombre de punto flotante. 
//Estos datos estan destinados a operaciones matemáticas. 

//Tipo String

"esto es un string"
"esto es una cadena de caracteres"
'tambien lo pueden tener en comillas simples'
"12345678"

//Los strings son cadenas de texto. Se pueden escribir con comillas dobles o simples. 


//Tipo boolean: 

false
true

//Son valores que pueden ser falsos o verdaderos. Los usamos generalmente para tomar decisiones en nuestro codigo, jutnoa bucles y condicionales. 

//Tipo undefined.

undefined
//"indefinido".
//Es un valor que se le asigna a una variable cuando todavía no se le ha asignado ningun valor. 

//Tipo null

null 
//Es un valor que se le asigna a una variable cuando queremos que no tenga ningún valor. Es decir, la ausencia intencional de un valor. 

//2) Variables: 
//Una variable es un espacio en memoria que almacena información importante para la ejecución del programa. Y como su nombre lo indica puede modificarse a lo largo del tiempo. 

//Declaramos variables con la palabra reservada "let":

let alumno; 

console.log(alumno);

//Asignamos un valor: 

alumno = "Tinki Winki";

console.log(alumno);

console.log( typeof alumno);

alumno = 10; 

console.log(alumno, typeof alumno);

//Inicializar variables:

let profesor = "Dipsy";

console.log(profesor);


//Constantes: 
//Las constantes son variables que no pueden cambiar su valor. Se declaran con la palabra reservada "const". Una vez que se le asigna un valor, no puede cambiar. 


const nacimiento = 1987;

console.log(nacimiento);

//nacimiento = 1997; 
//Si hago esto me da un error por consola. 

//Expresion: es una combinación de valores, variables y operadores que se pueden evaluar para producir un resultado. 

//En el curso de JS aprendimos sobre las expresiones booleanas: 

let ejemploExpresionBooleana = 10 > 5; 
///Esto como resultado me va a dar verdadero o falso. 

console.log(ejemploExpresionBooleana);


//2. Tipo objetos: 
//Tenemos los objetos, los arrays y funciones. 

//Tipo array: 
//Es una colección de datos, y lo interesante en JS, es que podemos almacenar cualquier tipo de dato. 

let unArray = [15, true, "tengo hambre", null];


//recuerden que se separan por indices, comenzando desde el 0
//Propiedad length me indica la cantidad de elementos que tiene el array. 

console.log(unArray[2])

unArray[2] = "ya casi vamos a comer";

console.log(unArray);


//Tipo Objeto: 

//Los objetos representan entidades, presentando datos relacionados y comportamientos (métodos).


let cliente = {
    nombre : "Juan",
    apellido: "Perez",
    edad : 30
};

console.log(cliente);

///SEGUNDO BLOQUE: 

//1) Plantillas Literales: 

//Antes: 

let mascota = "Fatiga";
let mascotaEdad = 5;

console.log("Nuestro perro " + mascota + " tiene " + mascotaEdad + " años");

//Ahora: 

console.log(`Nuestro perro ${mascota} tiene ${mascotaEdad + 1} años`);
//backticks alt + 96 

//2) Funciones: las funciones como bloques de código que podemos reutilizar en nuestro programa. Es importante destacar que una función debe tener una sola responsabilidad. 
//Codemetrics es una extensión que nos ayuda con esto. 

//Nos encontramos con dos tipos de funciones: 

//A) FUNCIONES DECLARADAS:

//1 paso, la voy a declarar

function saludar(curso) {
    //cuerpo de la función. 
    console.log("Hola Comisión!, curso de " + curso);
}

//2 paso, la invocamos: 
saludar("backend"); 


//¿Se puede invocar una función antes de su declaración? 
//Si se puede, gracias al "hoisting" (elevación), que es un proceso interno que realiza el lenguaje durante la lectura del código, en donde "eleva" las declaraciones de las funciones. 
//Guarda!! Atengos!! Solo con las funciones declaradas. 

//Funciones expresivas: 
//Se llaman así porque se definen usando expresiones. 

//Funciones anónimas: 

let nuevoSaludo = function(curso){
    console.log("La mejor comisión del condado es la de " + curso)
}

nuevoSaludo("backend");

//Lo que llega en ES6 son las funciones fechiña (arrow).
//Son una manera resumida de escribir funciones expresivas. 

//¿Por que se llaman flecha? => 
//A no confundirse con el mayor igual. 

const ultimoSaludo = curso => console.log("Hoy estudiamos " + curso);
//Version simplificada de la función flechiña. 

ultimoSaludo("Backend");

//3) Scope: 
//Es el alcance que tienen las variables dentro de nuestro programa. 
//En JS tenemos dos scope: global, local. 
//-Scope global: las variables declaradas en este scope puede ser accedidas desde cualquier parte del programa. 


let global = 2024;

function saludito() {
    console.log("Hola, estamos en el " + global);
    let curso = "Backend";
    console.log("Curso de " + curso);
}

saludito();

//console.log(curso);

//4) CLOSURES: los cierres o clausulas en JS es un concepto que se refiere a la capacidad de una funcion anidada de acceder a las variables de su función padre. 

function padre() {
    let deuda = 1500000;

    function anidada() {
        console.log(deuda);
    }
    return anidada;
}

let clausula = padre(); 
clausula();

//Esto se usaba para simular la existencia de variables privadas en JS, ya que en momento no existian. 
//Con la llegada de ES6, se incorporan las clases y con ellas la posibilidad de crear variables privadas. 

//5) Clases: 
//Las clases son moldes que nos permiten crear objetos con caracteristicas similares. 
//Recordemos que JS es un sistema basado en prototipos, y que no tiene clases como los lenguajes orientados a objetos.. ejemplo Java C#.
//Pero igual, en la versión ES6 se incorporaron las clases, que es una forma mas sensilla de crear objetos. 

//Ejemplo: 

class Persona {
    //Podemos agregar métodos estáticos, que se pueden ejecutar sin necesidad de crear una instancia de clase. 

    static planeta = "Tierra";

    constructor(nombre, edad){
        this.nombre = nombre; 
        this.edad = edad;
    }

    //Puedo agregar métodos: 
    saludar() {
        console.log("Hola, soy " + this.nombre);
    }

    despedir() {
        console.log("Chau, me voy, soy " + this.nombre);
    }
}


//Vamos a crear una instancia de nuestra clase Persona. Es decir, crear un objeto con este molde: 

let coky = new Persona("Coky", 42);
let paola = new Persona("Paola", 17);
console.log(coky);
coky.saludar();
paola.saludar();
paola.despedir();

//Herencia: es la capacidad de una clase de heredar propiedades y métodos. 

//Ejemplo: 

class Empleado extends Persona {
    constructor(nombre, edad, sueldo){
        super(nombre, edad);
        this.sueldo = sueldo; 
    }
    //Voy a crear mis propios metodos: 

    saludar() {
        console.log("Soy " + this.nombre + " y cobro este sueldo en dolares: " + this.sueldo );
    }

    cobrarSueldo() {
        console.log("cobré " + this.sueldo );
    }
}

//Instancia de Empleado:

const pepe = new Empleado("Pepe", 50, 2000);

console.log(pepe);

pepe.saludar();
pepe.cobrarSueldo();

//JS ES UN LENGUAJE BASADO EN PROTOTIPOS:

//¿Que es un prototipo?
//Un prototipo es un objeto del cual otro objeto hereda sus propiedades y métodos. 
//Entonces cada objeto que vamos a crear va a heredar las propiedades de su prototipo. 

const animal = {
    especie: "Animal", 
    comer: function() {
        console.log("Comiendo");
    }
}

const gato = {
    raza: "Gato",
    maullar: function(){
        console.log("Miau");
    }
}

//Puedo hacer que el objeto gato herede las propiedades del objeto animal? 
//Siii, y lo hacemos de la siguiente manera: 

gato.__proto__= animal;
console.log(gato);
//Esto es a modo educativo solamente, no lo hacemos en producción. 
//En lugar de utilizar __proto__,  podemos utilizar Object.create();  que es un método que nos permite crear un objeto a partir de otro objeto. 

//Ahora, animal es el prototipo de gato. 

gato.comer();

//Mostramos una variable estática por consola: 

console.log(Persona.planeta);

//Recuerden la clase 7 del curso del Javascript: Date.
