import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}

  create(createUserDto:CreateUserDto){
    try{
      const user = this.userRepository.create(createUserDto)
      return this.userRepository.save(user)
    } catch(e){
      throw new HttpException("Ja tem um Usuario com este email", HttpStatus.CONFLICT)
    }
  }

  findAll() {
    return this.userRepository.find()
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({where: {id: +id}});
    if (!user) {
        throw new NotFoundException('Usuario nao existe.')
    }
    return user;
}

async update(id: number, updateUserDto: UpdateUserDto) {
  const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto
  });
  if (!user) {
      throw new NotFoundException('Usuario nao existe.')
  }

  return this.userRepository.save(user);
}

  async delete(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
}
}
