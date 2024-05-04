class MemoryJugueteDao {
    constructor() {
        this.juguetes = []
    }

    async crearJuguete(datosJuguete){
        try {
            this.juguetes.push(datosJuguete);
            return datosJuguete; 
        } catch (error) {
            throw new Error("Error al crear un juguete en memory");
        }
    }

    async obtenerJuguetes() {
        try {
            return this.juguetes; 
        } catch (error) {
            throw new Error("Error al obtener todos los juguetes de memory");
        }
    }
}

export default MemoryJugueteDao;