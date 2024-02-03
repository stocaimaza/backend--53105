const fs = require("fs").promises;

class ManagerUsuarios {
    constructor() {
        this.rutaArchivo = "./usuarios.json";
    }

    async crearUsuarios(usuario){
        try {
            const usuariosActuales = await this.leerUsuarios();
            usuariosActuales.push(usuario);
            await this.guardarUsuarios(usuariosActuales);

        } catch (error) {
            console.log("Error al crear el usuario", error);
        }

    }

    async leerUsuarios(){
        try {
            const contenido = await fs.readFile(this.rutaArchivo, "utf-8");
            return JSON.parse(contenido);
        } catch (error) {
            console.log("Error al leer los usuarios ", error);
        }
    }

    async guardarUsuarios(arrayUsuarios){
        try {
            await fs.writeFile(this.rutaArchivo, JSON.stringify(arrayUsuarios, null, 2));
        } catch (error) {
            console.log("Error al guardar ", error)
        }
    }

    async consultarUsuario() {
        try {
            const usuarios = await this.leerUsuarios();
            console.log("Usuarios Registrados: ", usuarios);
        } catch (error) {
            console.log("No se puede consultar el usuario", error);
        }
    }
}

//Crear una instancia de ManagerUsuarios: 

const manager = new ManagerUsuarios(); 

//Agregamos un usuario: 

manager.crearUsuarios({
    nombre: "Tinki",
    apellido: "Winki",
    edad: 18,
    curso: "Backend"
});

//Consultamos usuarios: 

manager.consultarUsuario();