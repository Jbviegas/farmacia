import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/services/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';

@Module({
  imports: [
     TypeOrmModule.forRoot({//Configura a conexão com o banco de dados MySQL, especificando as credenciais e as entidades.
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_farmacia',
      entities: [Categoria],
      synchronize: true,
 }),
  CategoriaModule
    //Instancia o módulo de categoria(CategoriaModule), importando o TypeOrmModule para a entidade Categoria, e registrando o controlador e serviço de categoria.
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
