import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";



@Injectable()//Define a classe de serviço para os categorias, responsável por lidar com a lógica de negócios relacionada aos categorias.
export class CategoriaService {//CategoriaService é uma classe que contém métodos para realizar operações relacionadas aos categorias, como criar, buscar,
  //  atualizar e excluir categorias. Ele atua como uma camada intermediária entre o controlador (que lida com as requisições HTTP)
  //  e o repositório (que lida com a persistência de dados no banco de dados).
  constructor(
    //Injeta o repositório de categoria, permitindo que as operações de banco de dados sejam realizadas através do:
    //  TypeORM(que é um ORM - Object-Relational Mapping - que facilita a interação com o banco de dados, 
    // convertendo objetos JavaScript em comandos SQL).
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>//Esse repository é basicamente uma classe pronta com métodos
    // (find(), findOne(), save(), delete(), update(), createQueryBuilder()) para executar operações SQL automáticas no banco de dados.
  ) { }


  //Métodos


  //async é uma palavra-chave usada para definir uma função assíncrona, que é uma função que pode conter operações assíncronas,
  //  como chamadas de banco de dados ou requisições HTTP.
  async findAll(): Promise<Categoria[]> {//O método findAll() é um método assíncrono que retorna uma Promise
    //contendo um array de objetos do tipo categoria. Ele é usado para buscar todos os categorias disponíveis no banco de dados.
    // Select * from tb_categorias

    return this.categoriaRepository.find();
    //O método find() do TypeORM é usado para buscar todos os registros da tabela de categorias no banco de dados e retornar um array de objetos
    //do tipo categoria.

    //categoriaRepository é uma variavel privada que contém o repositório do categoria, que é injetado(o categoria) através do construtor da classe.
    //categoriaRepository é a variável que contém o repositório(Repository) que contém em si o método find para fazer a busca de todos os registros
    //categoriaRepository instancia(chama) o método find para buscar todos os categorias disponíveis no banco de dados.
  }

  async findById(id: number): Promise<Categoria> {
    // O método findById() é um método assíncrono que recebe um ID do tipo number como parâmetro e retorna uma Promise
    // contendo um objeto do tipo Categoria. Ele é usado para buscar uma categoria específica no banco de dados com base no ID fornecido.
    // Lógica para buscar uma categoria por ID / Select * from tb_categorias where id = ?

    const categoria = await this.categoriaRepository.findOne({
      //O método findOne() do TypeORM é usado para buscar um único registro no banco de dados com base em uma condição específica.

      //A propriedade where é usada para especificar a condição de busca, 
      // indicando que o campo id deve ser igual ao valor do parâmetro id fornecido.
      where: { id }
    });

    if (!categoria) {//Se a categoria não for encontrada (ou seja, se a variável categoria for nula ou indefinida), uma exceção HTTP é lançada com a mensagem 
      // 'Categoria não encontrada' e o status HTTP 404 (Not Found).

      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }
    return categoria;//Se a categoria for encontrada, ela é retornado como resultado do método.
  }

  async findAllByCategoria(categoria: string): Promise<Categoria[]> {
    // O método findAllByTitulo() é um método assíncrono que recebe um título do tipo string como parâmetro e retorna uma Promise
    // contendo um array de objetos do tipo Categoria. Ele é usado para buscar categorias no banco de dados
    // com base em uma correspondência parcial do título fornecido.

    // Lógica para buscar categorias por título / Select * from tb_categorias where titulo like '%titulo%'

    return this.categoriaRepository.find({
      //O método find() do TypeORM é usado para buscar registros no banco de dados com base em uma condição específica.

      //A propriedade where é usada para especificar a condição de busca, 
      // indicando que o campo titulo deve conter a string fornecida no parâmetro titulo.
      where: {
      categoria: ILike(`%${categoria}%`) //O operador ILike é usado para realizar uma busca case-insensitive, 
        // permitindo que a correspondência seja feita independentemente de maiúsculas ou minúsculas.
      }
    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    // O método create() é um método assíncrono que recebe um objeto do tipo Categoria como parâmetro e retorna uma Promise
    // contendo o objeto do tipo Categoria criado. Ele é usado para criar uma nova categoria no banco de dados.
    // Lógica para criar uma nova categoria / Insert into tb_categorias (titulo) values (?) 

    return this.categoriaRepository.save(categoria);
    // O método save() do TypeORM é usado para salvar uma entidade no banco de dados. Ele pode ser usado tanto para criar uma nova  
    // entidade quanto para atualizar uma entidade existente, dependendo se a entidade já possui um ID ou não.
    
    
    //categoriaRepository é uma variavel privada que contém o repositório da categoria, que é injetado(a Categoria) através do construtor da classe.
    //categoriaRepository é a variável que contém o repositório(Repository) que contém em si o método create para criar uma nova categoria
    //  e o método save para salvar a categoria criada no banco de dados.
  }

  async update(categoria: Categoria): Promise<Categoria> {
    // O método update() é um método assíncrono que recebe um objeto do tipo Categoria como parâmetro e retorna uma Promise
    // contendo o objeto do tipo Categoria atualizado. Ele é usado para atualizar uma categoria existente no banco de dados.
    // Lógica para atualizar uma categoria / Update tb_categorias set titulo = ? where id = ?

    return this.categoriaRepository.save(categoria);
    // O método save() do TypeORM é usado para salvar uma entidade no banco de dados. Ele atualiza a entidade se ela já possui um ID.

    //categoriaRepository é uma variavel privada que contém o repositório da categoria, que é injetado(a Categoria) através do construtor da classe.
    //categoriaRepository é a variável que contém o repositório(Repository) que contém em si o método save para atualizar a categoria existente
    //no banco de dados.
  }

  async delete(id: number): Promise<DeleteResult> {
    // O método delete() é um método assíncrono que recebe um ID do tipo number como parâmetro e retorna uma Promise
    // contendo void (sem valor). Ele é usado para excluir uma categoria existente no banco de dados com base no ID fornecido.
    // Lógica para excluir uma categoria / Delete from tb_categorias where id = ?

    await this.findById(id);//Verificando se a categoria existe antes de tentar excluir, para evitar erros de exclusão em categorias inexistentes.
   
    return this.categoriaRepository.delete(id);
    
    // O método delete() do TypeORM é usado para excluir um registro do banco de dados com base no ID fornecido.  
    //categoriaRepository é uma variavel privada que contém o repositório da categoria, que é injetado(a Categoria) através do construtor da classe.
    //categoriaRepository é a variável que contém o repositório(Repository) que contém em si o método delete para excluir a categoria existente
    //no banco de dados.
  }
    // O método delete() do TypeORM é usado para excluir um registro do banco de dados com base no ID fornecido.  
}
