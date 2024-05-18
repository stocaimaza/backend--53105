//Vamos a crear una clase para generar nuestros propios errores: 

class CustomError {
    static crearError({nombre = "Error", causa = "Desconocido", mensaje, codigo = 1}) {
        const error = new Error(mensaje);
        error.name = nombre;
        error.causa = causa;
        error.code = codigo; 
        throw error; 
        //Lanzamos el error, esto detiene la ejecucion de la app, por eso debemos capturarlo en otro modulo.
    }
}

export default CustomError;