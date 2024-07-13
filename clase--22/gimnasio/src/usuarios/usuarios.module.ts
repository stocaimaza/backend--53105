import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

//Importamos MongooseModule: 
import { MongooseModule } from '@nestjs/mongoose';

//Me tengo que traer la clase de Usuario y el Schema: 
import { Usuario, usuarioSchema } from './schema/usuarios.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Usuario.name,
    //Atentis a este name... ?? 
    //User.name está obteniendo el nombre de la clase User, que es una propiedad estándar de todas las funciones (y clases) en JavaScript. Por lo tanto, User.name simplemente devuelve la cadena "User".
    schema: usuarioSchema
  }])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
