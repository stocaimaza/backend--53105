//De mongoose me necesito traer algunas herramientas: 

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UsuariosDocument = HydratedDocument<Usuario>; 
//Un documento hidratado hace referencia a que los resultados devueltos por la base de datos sea retornados como instancias de documento de mongo, lo cual significa que cuanta con múltiples funcionalidades adicionales de mongo. 

//1) Armamos la clase Usuario

@Schema()
export class Usuario {
    @Prop({required: true})
    first_name: string; 

    @Prop()
    last_name: string; 

    @Prop({required: true, unique: true})
    email: string; 

    @Prop()
    password: string; 
}

export const usuarioSchema = SchemaFactory.createForClass(Usuario); 

