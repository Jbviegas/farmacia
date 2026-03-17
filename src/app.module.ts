import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { ProdutoModule } from './produto/produto.module';
import { Produto } from './produto/entities/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({//Configura a conexão com o banco de dados MySQL, especificando as credenciais e as entidades.
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_farmacia',
      entities: [Categoria, Produto],
      synchronize: true,
    }),

    ProdutoModule,
    //Instancia o módulo de produto(ProdutoModule), importando o TypeOrmModule para a entidade Produto, e registrando o 
    //controlador e serviço de produto.


    CategoriaModule
    //Instancia o módulo de categoria(CategoriaModule), importando o TypeOrmModule para a entidade Categoria, e registrando o
    //controlador e serviço de categoria.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
