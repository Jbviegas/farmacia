import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsNotEmpty, Length } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { Produto } from "../../produto/entities/produto.entity";




@Entity({ name: 'tb_categorias' })//Criando a tabela no banco de dados / CREATE TABLE tb_categorias
export class Categoria {//Define a classe de entidade Categoria, que representa a tabela "tb_categorias" no banco de dados.
    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @IsNotEmpty()//Validação para não aceitar campos vazios
    @Column({ length: 20, nullable: false })//Criando a coluna no banco de dados / CREATE TABLE categoria VARCHAR(20) NOT NULL
    @Length(2, 20)//Validação para aceitar apenas textos com comprimento entre 2 e 20 caracteres
    categoria: string;//Cria a coluna no banco de dados / CREATE TABLE categoria VARCHAR(20) NOT NULL
   
    
    //A anotação @OneToMany é usada para definir um relacionamento de um para muitos entre a entidade Categoria e a entidade Produto.
    @OneToMany(() => Produto, (produto) => produto.categoria)
    //Lá em Produto, a propriedade categoria é do tipo Categoria(categoria: Categoria),
    //  indicando que cada produto está associado a uma categoria específica.

    //Essa associação permite que os produtos sejam organizados e categorizadas com base nas categorias aos quais pertencem.

    //O relacionamento é estabelecido usando a função de retorno de chamada () => Produto, 
    // que indica que a entidade relacionada é a entidade Produto.

    //O segundo argumento (produto) => produto.categoria é usado para definir a propriedade inversa do relacionamento,
    //  indicando que a entidade Produto tem uma propriedade chamada categoria que se relaciona com a entidade Categoria.

    produto: Produto[];
}