import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book, BookSchema } from './schema/book';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:Book.name, schema:BookSchema}])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
