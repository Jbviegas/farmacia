import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";

//Define a rota base para as categorias, permitindo que as requisições sejam direcionadas para este controlador
@Controller('/categorias')
export class CategoriaController {//Define a classe do controlador para as categorias, responsável por lidar com as requisições HTTP relacionadas 
// às categorias.


    //Construtor do tipo associação, onde a classe de serviço da categoria(Categoriaservice) é injetada no controlador,
    constructor(private readonly categoriaService: CategoriaService) {}
    // Injeta o serviço de categoria no controlador(Categoriaservice), permitindo que as operações relacionadas as categorias sejam realizadas 
    // através do serviço(categoriaservice).

    @Get()//Define um manipulador de rota para requisições GET na rota base (/categorias), que é usada para buscar todos os categorias disponíveis
    //  no banco de dados.
    @HttpCode(HttpStatus.OK)//Define o código de status HTTP 200 (OK) para a resposta dessa rota, indicando que a requisição foi bem-sucedida.
    findAll(): Promise<Categoria[]> {//O método findAll() é um método que retorna uma Promise contendo um array de objetos do tipo Categoria.
    //  Ele é usado para buscar todas as categorias disponíveis no banco de dados.

        return this.categoriaService.findAll();
        // O método findAll() do serviço de categoria é chamado para buscar todas as categorias disponíveis no banco de dados,
        //  e o resultado é retornado como resposta da rota.
    }

    @Get("/:id")//Define um manipulador de rota para requisições GET na rota /categorias/:id, onde :id é um parâmetro de rota que representa o ID
    //  da categoria a ser buscada.

    @HttpCode(HttpStatus.OK)//Define o código de status HTTP 200 (OK) para a resposta dessa rota, indicando que a requisição foi bem-sucedida.
    findById(@Param("id", ParseIntPipe) id: number): Promise<Categoria>{
    //O método findById() é um método que recebe um ID do tipo number como parâmetro e retorna uma Promise contendo um objeto do tipo Categoria.
    //  Ele é usado para buscar uma categoria específica no banco de dados com base no ID fornecido.

    //Param("id", ParseIntPipe) é um decorador usado para extrair o valor do parâmetro de rota "id" e convertê-lo para um número inteiro
    //  usando o ParseIntPipe.

        return this.categoriaService.findById(id);
        // O método findById() do serviço de categoria é chamado para buscar uma categoria específica no banco de dados com base no ID fornecido,
        //  e o resultado é retornado como resposta da rota.
    }
    
    @Get("/categoria/:categoria")//Define um manipulador de rota para requisições GET na rota /categorias/categoria/:categoria, onde :categoria é um parâmetro de rota que representa o nome da categoria a ser buscada.

    @HttpCode(HttpStatus.OK)//Define o código de status HTTP 200 (OK) para a resposta dessa rota, indicando que a requisição foi bem-sucedida.
    findAllByCategoria(@Param("categoria") categoria: string): Promise<Categoria[]>{
    //O método findAllByCategoria() é um método que recebe um nome de categoria do tipo string como parâmetro e retorna uma Promise contendo um array 
    // de objetos do tipo Categoria.
    //  Ele é usado para buscar todas as categorias disponíveis no banco de dados que correspondam ao nome fornecido.
    
    //Param("categoria") é um decorador usado para extrair o valor do parâmetro de rota "categoria" e usá-lo como argumento
    //  para a busca das categorias.

        return this.categoriaService.findAllByCategoria(categoria);
        // O método findAllByCategoria() do serviço de categoria é chamado para buscar todas as categorias disponíveis no banco de dados que correspondam ao nome fornecido,
        //  e o resultado é retornado como resposta da rota.
    }   


    @Post()//Define um manipulador de rota para requisições POST na rota base (/categorias), que é usada para criar uma nova categoria no banco de dados.

    @HttpCode(HttpStatus.CREATED)//Define o código de status HTTP 201 (Created) para a resposta dessa rota, indicando que um novo recurso
    //  foi criado com sucesso.

    create(@Body() categoria: Categoria): Promise<Categoria>{
    //O método create() é um método que recebe um objeto do tipo Categoria como parâmetro e retorna uma Promise contendo um objeto do tipo Categoria.
    //  Ele é usado para criar uma nova categoria no banco de dados com base nos dados fornecidos no corpo da requisição.

    //Body() é um decorador usado para extrair os dados do corpo da requisição e usá-los como argumento para a criação da nova categoria.

        return this.categoriaService.create(categoria);
        // O método create() do serviço de categoria é chamado para criar uma nova categoria no banco de dados com base nos dados fornecidos
        //  no corpo da requisição, e o resultado é retornado como resposta da rota.
    }  

    @Put()//Define um manipulador de rota para requisições PUT na rota base (/categorias), que é usada para atualizar uma categoria existente no banco de dados.
    @HttpCode(HttpStatus.OK)//Define o código de status HTTP 200 (OK) para a resposta dessa rota, indicando que a requisição foi bem-sucedida.
    update(@Body() categoria: Categoria): Promise<Categoria>{
    //O método update() é um método que recebe um objeto do tipo Categoria como parâmetro e retorna uma Promise contendo um objeto do tipo Categoria.
    //  Ele é usado para atualizar uma categoria existente no banco de dados com base nos dados fornecidos no corpo da requisição.    
    //Body() é um decorador usado para extrair os dados do corpo da requisição e usá-los como argumento para a atualização da categoria existente.

        return this.categoriaService.update(categoria);
        // O método update() do serviço de categoria é chamado para atualizar uma categoria existente no banco de dados com base nos dados fornecidos
        //  no corpo da requisição, e o resultado é retornado como resposta da rota.
    }

    @Delete("/:id")//Define um manipulador de rota para requisições DELETE na rota /categorias/:id, onde :id é um parâmetro de rota 
    // que representa o ID da categoria a ser deletada.  

    @HttpCode(HttpStatus.NO_CONTENT)//Define o código de status HTTP 204 (No Content) para a resposta dessa rota, indicando 
    // que a requisição foi bem-sucedida e que o recurso foi deletado com sucesso.

    delete(@Param("id", ParseIntPipe) id: number){
    //O método delete() é um método que recebe um ID do tipo number como parâmetro e não retorna nenhum valor.
    //  Ele é usado para deletar uma categoria específica no banco de dados com base no ID fornecido.    
    //Param("id", ParseIntPipe) é um decorador usado para extrair o valor do parâmetro de rota "id" e convertê-lo para um número inteiro
    //  usando o ParseIntPipe. 

        return this.categoriaService.delete(id);
        // O método delete() do serviço de categoria é chamado para deletar uma categoria específica no banco de dados com base no ID fornecido,
        //  e o resultado é retornado como resposta da rota.
}  
}
