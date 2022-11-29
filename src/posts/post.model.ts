import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity } from "typeorm"

@ObjectType()
export class Post {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field(type => Int, { nullable: true })
  votes?: number;
}

@Entity({ name: 'post' })

export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    title: string;

    @Column({ nullable: true })
    votes?: number;
}

// import { Field, ID, ObjectType } from '@nestjs/graphql';

// @ObjectType()
// export class Post {
//   @Field(() => ID)
//   id: number;

//   @Field()
//   title: string;

//   @Field()
//   body: string;
// }