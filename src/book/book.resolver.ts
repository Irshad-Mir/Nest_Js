import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BookService } from "./book.service";
import { Book } from "./schema/book.schema";
import{Book as BookModel} from "../graphql"
import { AddBookAgrs } from "./args/add.book.agrs";


@Resolver(of => Book)
export class BookResolver{

    constructor(private readonly bookService:BookService){}

    //Queries and Mutations

    //Queries
  @Query(returns =>[Book], {name:"books"})
   getAllBooks():BookModel[] {
    return this.bookService.findAllBooks();
   }
   @Query(returns =>Book, {name:"getBookById", nullable:true})
   getBookById(@Args({name:'bookId', type:() =>Int})id:number):BookModel {
    return this.bookService.findBookById(id);
   }


   // Mutations

   @Mutation(returns =>String, {name:"deleteBook"})
   deleteBookById(@Args({name:'bookId', type:() =>Int})id:number):
   string {
    return this.bookService.deleteBook(id);
   }


   @Mutation(returns =>String, {name:"addBook"})
   addBook(@Args("addBookArgs")addBookArgs:AddBookAgrs):
   string {
    return this.bookService.addBook(addBookArgs);
   }

   @Mutation(returns =>String, {name:"updateBook"})
   updateBook(@Args({name:'bookId', type:() =>Int})id:number,
   @Args("updateBookArgs")updateBookArgs:AddBookAgrs):
   string {
    return this.bookService.updateBook(id, updateBookArgs);
   }






}