import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.model';



@Module({
    imports:[TypeOrmModule.forFeature([PostEntity])],
    providers: []
})
export class PostModule {}