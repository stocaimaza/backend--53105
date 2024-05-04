import fs from "fs";

class FileSystemJugueteDao {
    async crearJuguete(datosJuguete) {
        try {
            //Leer el archivo actual: 
            const juguetes = await this.leerArchivo();

            //Agregar el nuevo juguete: 
            juguetes.push(datosJuguete);

            //Escribimos el archivo actualizado: 
            await this.escribirArchivo(juguetes);
            return datosJuguete;
        } catch (error) {
            throw new Error("Error al crear un juguete en un sistema de archivos. ")
        }
    }

    async obtenerJuguetes() {
        try {
            //Leer el archivo y retornarlo: 
            const juguetes = await this.leerArchivo();
            return juguetes;
        } catch (error) {
            throw new Error("Error al obtener los juguetes de un sistema de archivos. ")
        }
    }

    //Métodos auxiliares: 
    async leerArchivo() {
        try {
            const data = await fs.promises.readFile("./juguetes.json");
            return JSON.parse(data);
        } catch (error) {
            throw new Error("No se puede leer el archivo, vamos a morir un fin de semana");
        }
    }

    async escribirArchivo(data) {
        try {
            await fs.promises.writeFile("./juguetes.json", JSON.stringify(data, null, 2));
        } catch (error) {
            throw new Error("No podemos escribir el archivo, vamos a morir un fin de semana");
        }
    }
}

export default FileSystemJugueteDao;