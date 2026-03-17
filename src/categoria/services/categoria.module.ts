

//Decorador @Module é usado para definir um módulo no NestJS, que é uma forma de organizar o código em unidades coesas.
//  O módulo de categoria é responsável por agrupar os componentes relacionados aos categorias, como o serviço e o controlador.

import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { Categoria } from "../entities/categoria.entity";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { CategoriaService } from "./categoria.service";
import { CategoriaController } from "../controllers/categoria.controller";

@Module({//Configuração do módulo de categoria, especificando as importações, controladores e provedores necessários para o funcionamento do módulo.


    //Importação de módulos necessários para o módulo de categoria:

    imports: [TypeOrmModule.forFeature([Categoria])],
    //Importa o TypeOrmModule para a entidade Categoria, permitindo que o módulo de categoria tenha acesso às operações de banco de dados relacionadas
    //  as categorias.



    //Registro de componentes do módulo do categoria:

    controllers: [CategoriaController],
    //Registra o controlador de categoria(CategoriaController), que é responsável por lidar com as requisições HTTP relacionadas aos categorias.

    providers: [CategoriaService],
    //Registra o serviço de categoria(CategoriaService), que é responsável por lidar com a lógica de negócios relacionada aos categorias.

    exports: [CategoriaService]//Exporta o serviço de categoria(categoriaService), permitindo que ele seja usado em outros módulos, 
    // como o módulo principal da aplicação (AppModule).
})
export class CategoriaModule { }/*Exporta a classe do módulo de categoria(CategoriaModule), tornando-a disponível para ser importada em outros módulos,
 como o módulo principal da aplicação (AppModule) */

