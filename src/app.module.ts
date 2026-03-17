import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
     TypeOrmModule.forRoot({//Configura a conexão com o banco de dados MySQL, especificando as credenciais e as entidades.
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_farmacia',
      entities: [],
      synchronize: true,
 }) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
