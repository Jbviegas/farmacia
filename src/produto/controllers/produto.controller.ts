import { Controller, Get, HttpStatus, ParseIntPipe, Param, HttpCode, Post, Body, Delete, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";
//Define a rota base para os produtos, permitindo que as requisições sejam direcionadas para este controlador
@Controller('/produtos')
export class ProdutoController {//Define a classe de controlador para os produtos, responsável por lidar com as requisições HTTP relacionadas 
    // às postagens.


    //Construtor do tipo associação, onde a classe de serviço de produto(ProdutoService) é injetada no controlador,
    //  permitindo que as operações relacionadas aos produtos sejam realizadas através do serviço(ProdutoService).
    constructor(private readonly produtoService: ProdutoService) { }
    // Injeta o serviço de produto no controlador(ProdutoService), permitindo que as operações relacionadas aos produtos sejam realizadas
    //  através do serviço(ProdutoService).

    @Get()//Define um manipulador de rota para requisições GET na rota base (/produto), que é usada para buscar todos os produtos disponíveis
    //  no banco de dados.
    @HttpCode(HttpStatus.OK)//Define o código de status HTTP 200 (OK) para a resposta dessa rota, indicando que a requisição foi bem-sucedida.
    findAll(): Promise<Produto[]> {//O método findAll() é um método que retorna uma Promise contendo um array de objetos do tipo Produto.
        //  Ele é usado para buscar todos os produtos disponíveis no banco de dados.

        return this.produtoService.findAll();
        // O método findAll() do serviço de produto é chamado para buscar todos os produtos disponíveis no banco de dados,
        //  e o resultado é retornado como resposta da rota.
    }




    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Produto> {
        return this.produtoService.findById(id);
    }



    @Get("/titulo/:titulo")
    @HttpCode(HttpStatus.OK)
    findAllByTitulo(@Param("titulo") titulo: string): Promise<Produto[]> {
        return this.produtoService.findAllByTitulo(titulo);
    }



    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto);
    }



    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.update(produto);
    }



    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.produtoService.delete(id);
    }

}
