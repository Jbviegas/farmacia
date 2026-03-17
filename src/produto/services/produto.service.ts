import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, DeleteResult } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";
import { Produto } from "../entities/produto.entity";



@Injectable()//Define a classe de serviço para as categoria, responsável por lidar com a lógica de negócios relacionada às categoria.
export class ProdutoService {

    constructor(
        //Injeta o repositório de produto, permitindo que as operações de banco de dados sejam realizadas através do TypeORM.
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,//Esse repository é basicamente uma classe pronta com métodos
        // (find(), findOne(), save(), delete(), update(), createQueryBuilder()) para executar operações SQL automáticas no banco de dados.

        private readonly categoriaService: CategoriaService//Injeta o serviço de categoria, permitindo que as operações relacionadas às categorias sejam realizadas através do serviço de categoria.
    ) { }



    //Métodos

    async findAll(): Promise<Produto[]> {//O método findAll() é um método assíncrono que retorna uma Promise
        //contendo um array de objetos do tipo Postagem. Ele é usado para buscar todas as categoria disponíveis no banco de dados.
        // Select * from tb_categoria
        return this.produtoRepository.find();
    }



    async findById(id: number): Promise<Produto> {
        // Lógica para buscar um produto por ID / Select * from tb_produtos where id = ?

        const produto = await this.produtoRepository.findOne({
            where: {
                id
            }
        });
        if (!produto) {
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
        }
        return produto;
    }



    async findAllByTitulo(titulo: string): Promise<Produto[]> {
        // Lógica para buscar produto por título / Select * from tb_produtos where titulo like '%titulo%'
        return this.produtoRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        });
    }



    async create(produto: Produto): Promise<Produto> {
        // Lógica para criar uma nova produto / Insert into tb_categoria (titulo, conteudo) values (?, ?)

        await this.categoriaService.findById(produto.categoria.id);
        // Verificando se o categoria associado à produto existe antes de criar a produto, para evitar erros de criação
        //  em categoria com temas inexistentes.

        return this.produtoRepository.save(produto);
    }// O método save() do TypeORM é usado para salvar uma entidade no banco de dados. Ele pode ser usado tanto para criar uma nova
    //  entidade quanto para atualizar uma entidade existente, dependendo se a entidade já possui um ID ou não.

    //--------------------------------------------------------------------------------------------------------------------------------//

    // UPDATE tb_categoria SET titulo = ?, 
    // texto = ? , 
    // data = CURRENT_TIMESTAMP()
    // WHERE id = ?;
    async update(produto: Produto): Promise<Produto> {//INjetando o objeto produto para atualizar a produto existente
        // Lógica para atualizar uma produto existente / Update tb_categoria set titulo = ?, conteudo = ? where id = ?
        if (!produto.id || produto.id <= 0)//Verificando se o ID da produto é válido, ou seja, se ele existe e é um número positivo.

            throw new HttpException("O ID da produto é inválido!", HttpStatus.BAD_REQUEST);
        // Se o ID for inválido, lança uma exceção HTTP com status 400 (Bad Request) e uma mensagem de erro indicando que o ID da
        //  produto é inválido.

        await
            this.findById(produto.id);//Verificando se a produto existe antes de tentar atualizar, para evitar erros de atualização
        //  em categoria inexistentes.

        await this.categoriaService.findById(produto.categoria.id);//Verificando se o categoria associado à produto existe antes de atualizar a produto, 
        // para evitar erros de atualização

        return this.produtoRepository.save(produto);
        // O método save() do TypeORM é usado para salvar uma entidade no banco de dados. Ele pode ser usado tanto para criar uma nova
        //  entidade quanto para atualizar uma entidade existente, dependendo se a entidade já possui um ID ou não. Neste caso, como a produto
        //  já possui um ID válido, o método save() irá atualizar a produto existente no banco de dados com os novos valores fornecidos.
    }



    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        // DELETE tb_categoria FROM id = ?;
        return this.produtoRepository.delete(id);

    }

}



//O TypeORM cria um objeto assim: Repository<Postagem>

//Esse repository é basicamente uma classe pronta com métodos como:
/*

find()
findOne()
save()
delete()
update()
createQueryBuilder()


Quando você faz: this.postagemRepository.find()

O TypeORM traduz isso para um comando SQL: SELECT * FROM tb_categoria

Internamente o TypeORM utiliza um driver específico para o banco de dados (como mysql2 para MySQL) para se comunicar com o banco
 e executar as operações SQL necessárias, como a consulta para buscar todas as categoria.


📌 Resumo do TypeORM

Entity → Define tabela
Repository → Executa SQL automático
Driver (mysql2) → Fala com banco
Banco → Executa SQL

Ele é um ORM → Object Relational Mapper

Ele traduz:

Objeto TypeScript ↔ Tabela SQL
*/