import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsNotEmpty, Length } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";




@Entity({ name: 'tb_categorias' })//Criando a tabela no banco de dados / CREATE TABLE tb_categorias
export class Categoria {//Define a classe de entidade Categoria, que representa a tabela "tb_categorias" no banco de dados.
    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())//Validação para retirar os espaços em branco no início e no final do campo
    @IsNotEmpty()//Validação para não aceitar campos vazios
    @Column({ length: 20, nullable: false })//Criando a coluna no banco de dados / CREATE TABLE categoria VARCHAR(20) NOT NULL
    @Length(2, 20)//Validação para aceitar apenas textos com comprimento entre 2 e 20 caracteres
    categoria: string;//Cria a coluna no banco de dados / CREATE TABLE categoria VARCHAR(20) NOT NULL

}