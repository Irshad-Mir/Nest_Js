import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppResolver } from './app.resolver';
import { BookModule } from './book/book.module';
import { PostModule } from './posts/post.module';




@Module({
  imports: [   GraphQLModule.forRoot({
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile:join(process.cwd(), 'src/schema.graphql'),
    definitions:{
      path:join(process.cwd(), 'src/graphql.ts')
    }
  }),
TypeOrmModule.forRoot({
  type:'postgres',
  host:'localhost',
  port:5432,
  username:'postgres',
  password:'postgres',
  database:'Mir-Db',
  entities:[join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize:true,

}),
BookModule, PostModule
],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
