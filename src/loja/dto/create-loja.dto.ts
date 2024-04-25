import { IsString } from "class-validator";

export class CreateLojaDto {
    @IsString()
    readonly name: string;
    @IsString()
    readonly localizacao: string;
    @IsString()
    readonly data_criacao: string;
}