//1 Desafio Backend

class ProductManager {
    static ultId = 0; 
    //Para lograr el id autoincrementable puedo usar una variable estatica, la cual pertenece a la clase. 
    constructor() {
        this.products = []
    }

    //Tenemos que hacer 3 métodos: addProduct, getProducts, getProductById: 

    addProduct(title, description, price, img, code, stock) {

        //Validaciones: 

        if(!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return; 
        }

        if(this.products.some(item=> item.code === code)) {
            console.log("El code debe ser unico");
            return; 
        }


        //Con estos datos que recibo, voy a crear un nuevo objeto de producto: 

        const nuevoProducto = {
            id: ++ProductManager.ultId,
            title, 
            description, 
            price,
            img,
            code,
            stock
        }

        //Lo pusheo al array
        this.products.push(nuevoProducto);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const producto = this.products.find(item => item.id === id );

        if(!producto) {
            return "Not Found";
        } 
        return producto; 
    }
}

//1) Se creará una instancia de la clase “ProductManager”.

const manager = new ProductManager();

//2) Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

console.log(manager.getProducts());


//3)Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25

manager.addProduct("Producto prueba", "este es un producto de prueba", 200, "sin imagen", "abc123", 25);

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

manager.addProduct("Francia", "este es un producto de prueba", 200, "sin imagen", "abc124", 25);

manager.addProduct("Firulais", "este es un producto de prueba", 200, "sin imagen", "abc125", 25);

//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

console.log(manager.getProducts());

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

manager.addProduct("Pepe", "este es un producto de prueba", 200, "sin imagen", "abc126");

//Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

console.log("Buscamos producto por id:");
console.log(manager.getProductById(10));