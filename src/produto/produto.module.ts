

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './services/produto.service';
import { ProdutoController } from './controllers/produto.controller';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    controllers: [ProdutoController],
    providers: [ProdutoService],
})
export class ProdutoModule { }

//Instancia o módulo de Produto, importando o TypeOrmModule para a entidade Produto, e registrando o controlador e serviço de produto.