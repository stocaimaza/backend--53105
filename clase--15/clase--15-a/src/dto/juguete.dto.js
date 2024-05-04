class JugueteDTO {
    constructor(nombre, categoria, precio){
        this.nombre = nombre; 
        this.categoria = categoria;
        this.precio = precio; 
        this.fullname = `${nombre} - ${categoria}`;
        //Concatenamos los datos para crear un full name. 
    }
}

export default JugueteDTO; 