import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne } from "typeorm";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { NumericTransformer } from "../../util/numerictranformer";
import { Categoria } from "../../categoria/entities/categoria.entity";



@Entity({ name: 'tb_produtos' })//Criando a tabela no banco de dados / CREATE TABLE tb_categorias
export class Produto {//Define a classe de entidade Produto, que representa a tabela "tb_produtos" no banco de dados.
    @PrimaryGeneratedColumn()//Cria a coluna de chave primária com auto-incremento no banco de dados / CREATE TABLE id INT PRIMARY KEY AUTO_INCREMENT
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @IsNotEmpty()//Validação para não aceitar campos vazios
    @Column({ length: 100, nullable: false })//Criando a coluna no banco de dados / CREATE TABLE titulo VARCHAR(100) NOT NULL
    titulo: string;


    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    preco: number//Cria a coluna no banco de dados / CREATE TABLE preco DECIMAL(10, 2) NOT NULL

    @Transform(({ value }: TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @IsNotEmpty()//Validação para não aceitar campos vazios
    @Column({ length: 500 })
    foto: string//Criando a coluna no banco de dados / CREATE TABLE foto VARCHAR(500) NOT NULL


    @UpdateDateColumn()//Criar a coluna de data de atualização no banco de dados / CREATE TABLE data DATETIME
    data: Date;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {//Lá em Categoria, a propriedade produtos é um array de Produto(produtos: Produto[]),
        // indicando que uma categoria pode ter vários produtos associados a ela.

        //A anotação @ManyToOne é usada para definir um relacionamento de muitos para um entre a entidade Produto e a entidade Categoria.
        //A função de retorno de chamada () => Categoria é usada para indicar que a entidade relacionada é a entidade Categoria.

        //O segundo argumento (categoria) => categoria.produto é usado para definir a propriedade inversa do relacionamento,
        //  indicando que a entidade Categoria tem uma propriedade chamada produto que se relaciona com a entidade Produto.

        onDelete: "CASCADE"
        //A opção onDelete: "CASCADE" é usada para definir o comportamento de exclusão em cascata, o que significa que quando um categoria for excluído,
        //  todos os produtos associadas a esse categoria também serão excluídos automaticamente do banco de dados.
    })
    categoria: Categoria;//A propriedade categoria é do tipo Categoria, indicando que cada produto está associado a uma categoria específica.
   
    //Essa associação permite que os produtos sejam organizados e categorizados com base nas categorias às quais pertencem.
    //Representa a chave estrangeira que estabelece o relacionamento entre a tabela de produtos e a tabela de categorias no banco de dados.

}
