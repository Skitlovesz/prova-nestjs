import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LojaModule } from './loja/loja.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forRoot({
    type:"sqlite",
    database: 'banco',
    autoLoadEntities: true,
    synchronize: true
  }),
    UsersModule, LojaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
