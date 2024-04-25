import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Loja {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    name:string;
    @Column()
    localizacao:string;
    @Column()
    data_criacao:string;
}

