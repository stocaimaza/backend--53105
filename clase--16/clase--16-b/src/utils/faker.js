import { faker } from "@faker-js/faker";

const generarProductos = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(), 
        stock: parseInt(faker.string.numeric())
    }
}


export const generarUsuarios = () => {

    const numeroDeProductos = parseInt(faker.string.numeric());
    let productos = [];

    for(let i = 0; i < numeroDeProductos; i++){
        productos.push( generarProductos() );
    }

    return {
        id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        image: faker.image.avatar(),
        email: faker.internet.email(),
        productos
    }
}