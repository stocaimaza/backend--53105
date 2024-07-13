import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

//Paso 1. impotaciones 

//importamos el decorador @InjectModel: 
import { InjectModel } from '@nestjs/mongoose';

//importamos el model de mongoose: 
import { Model } from 'mongoose';

//importamos el usuario y el usuarioSchema: 
import { Usuario, UsuariosDocument, usuarioSchema } from './schema/usuarios.schema';

@Injectable()
export class UsuariosService {

  //Paso 2, generamos un constructor: 
  constructor(@InjectModel(Usuario.name) private usuarioModel: Model <UsuariosDocument>){}
  //Luego, declararemos una variable privada que representa el modelo que vamos a usar en los servicios. 

  create(createUsuarioDto: CreateUsuarioDto) {
    return  this.usuarioModel.create(createUsuarioDto);
  }

  findAll() {
    return this.usuarioModel.find();
  }

  async findOne(id: string) : Promise<Usuario> {
    return await this.usuarioModel.findById(id).exec();
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    return await this.usuarioModel.findByIdAndUpdate(id, updateUsuarioDto).exec();
  }

  async remove(id: string) {
    return await this.usuarioModel.findByIdAndDelete(id).exec();
  }
}
