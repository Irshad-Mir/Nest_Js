import { Field, InputType, Int, } from "@nestjs/graphql";

@InputType()
export class AddUserArgs {
  
    @Field()
    name: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()

export class UpdateUserArgs {
    @Field((type) => Int)
    id: number;
  
    @Field()
    name: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;
} 