import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';

@Module({
    imports:[TypeOrmModule.forFeature([BookEntity])],
    controllers:[],
    providers:[BookService, BookResolver],
})
export class BookModule {}
