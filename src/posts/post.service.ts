import { HttpException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from 'typeorm'

import { Post, PostEntity } from "./post.model"

@Injectable()
export class PostService {
 

    constructor( @InjectRepository(Post) public readonly postRepo:Repository<Post>){}

 

  async addbook(post:Post):Promise<String>{
    let posts:PostEntity=new PostEntity();
    posts.title=post.title;
    posts.votes=post.votes;
    await this.postRepo.save(posts)
    return "Add post"
 }


}