import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()

export class AddBookAgrs{

     @Field((type)=>Int)
     id:number;

     @Field()
     title:string;

    @Field((type)=>Int)
      price:number;

}