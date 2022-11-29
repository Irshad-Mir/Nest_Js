import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddPost {
    id: number;

    @Field()
    title: string;
  
    @Field(type => Int, { nullable: true })
    votes?: number;
}