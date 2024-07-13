import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';

//Middleware: 
import MiMiddleware from './middleware/miMiddleware';

//1) Pare realizar la conexion importamos MongooseModule: 
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsuariosModule, MongooseModule.forRoot("mongodb+srv://coderhouse53105:coderhouse@cluster0.o9ipohi.mongodb.net/nest?retryWrites=true&w=majority&appName=Cluster0")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiMiddleware).forRoutes({path: "*", method: RequestMethod.ALL})
  }
}
