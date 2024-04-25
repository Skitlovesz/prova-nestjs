import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { Loja } from './entities/loja.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class LojaService {

  constructor(@InjectRepository(Loja) private readonly lojaRepository:Repository<Loja>){}

  create(createlojaDto:CreateLojaDto){
    try{
      const loja = this.lojaRepository.create(createlojaDto)
      return this.lojaRepository.save(loja)
    } catch(e){
      throw new HttpException("Ja tem uma loja com este nome", HttpStatus.CONFLICT)
    }
  }

  findAll() {
    return this.lojaRepository.find()
  }

  async findOne(id: number) {
    const loja = await this.lojaRepository.findOne({where: {id: +id}});
    if (!loja) {
        throw new NotFoundException('Loja nao existe.')
    }
    return loja;
}

async update(id: number, updatelojaDto: UpdateLojaDto) {
  const loja = await this.lojaRepository.preload({
      id: +id,
      ...updatelojaDto
  });
  if (!loja) {
      throw new NotFoundException('Loja nao existe.')
  }

  return this.lojaRepository.save(loja);
}

async fullUpdate(id: number, createlojaDto: CreateLojaDto){
  const loja = await this.lojaRepository.preload({
    id: +id,
    ...createlojaDto
});
if (!loja) {
    throw new NotFoundException('Loja nao existe.')
}

return this.lojaRepository.save(loja);
}

  async delete(id: number) {
    const loja = await this.findOne(id);
    return this.lojaRepository.remove(loja);
}
}
