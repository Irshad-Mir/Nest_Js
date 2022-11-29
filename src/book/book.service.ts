import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "./book.entity";
import {Repository} from 'typeorm'
import { AddBookArgs, } from "./addbook.args";
import { UpdateBookArgs } from "./updateBookArgs";

@Injectable()

export class BookService{
   
constructor( @InjectRepository(BookEntity) public readonly bookRepo:Repository<BookEntity>){}

async findAllBooks():Promise<BookEntity[]>{
    let books=await this.bookRepo.find()
    return books
}

async findBookById(id:number):Promise<BookEntity>{
   let book=await this.bookRepo.findOne({where:{id:id}});
   return book 
}

async deleteBookById(id:number):Promise<string>{
    await this.bookRepo.delete(id);
    return "book deleted" 
 }
 async addbook(addBookArgs:AddBookArgs):Promise<String>{
    let book:BookEntity=new BookEntity();
    book.title=addBookArgs.title;
    book.price=addBookArgs.price;
    await this.bookRepo.save(book)
    return "Add book"
 }
 async updatebook(updateBookArgs:UpdateBookArgs):Promise<String>{
    let updatebook:BookEntity=await this.bookRepo.findOne({where:{

    
    id:  updateBookArgs.id  
    }})
    updatebook.title=updateBookArgs.title;
    updatebook.price=updateBookArgs.price;
    await this.bookRepo.save(updatebook)
    return "updated book"
 }

}