import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';

@Controller('lojas')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Post()
  create(@Body() createlojaDto: CreateLojaDto) {
    return this.lojaService.create(createlojaDto);
  }

  @Get()
  findAll() {
    return this.lojaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lojaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLojaDto: UpdateLojaDto) {
    return this.lojaService.update(+id, updateLojaDto);
  }

  @Put(':id')
  fullUpdate(@Param('id') id: string, @Body() createLojaDto: CreateLojaDto) {
    return this.lojaService.fullUpdate(+id, createLojaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.lojaService.delete(+id);
  }
}
