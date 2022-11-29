import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AddBookArgs, } from "./addbook.args";


import { Book } from "./book.schema";
import { BookService } from "./book.service";
import { UpdateBookArgs } from "./updateBookArgs";



@Resolver(of=>Book)
export class BookResolver{



    constructor(private readonly bookService:BookService){}


    @Query(returns=>[Book])
    getAllBooks(){
        return this.bookService.findAllBooks()
    }

    @Query(returns=>Book, {name:'bookById'})
    getBookById(@Args({name:'bookId', type:()=>Int})id:number){
        return this.bookService.findBookById(id)
    }

    @Mutation(returns=>String, {name:'deleteBook'})
    deleteBookById(@Args({name:'bookId', type:()=>Int})id:number){
        return this.bookService.deleteBookById(id)
    }
    @Mutation(returns=>String, {name:'addBook'})
    addBook(@Args("addBookArgs")addBookArgs:AddBookArgs){
        return this.bookService.addbook(addBookArgs)
    }
    @Mutation(returns=>String, {name:'updateBook'})
    updateBook(@Args("updateBookArgs")updateBookArgs:UpdateBookArgs){
        return this.bookService.updatebook(updateBookArgs)
    }
}