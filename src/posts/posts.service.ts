import { Injectable } from '@nestjs/common';
import { BADQUERY } from 'dns';
import { User } from 'src/user/user.dto';
import { CreatePostDto, GetAllPostDto, GetPostDto } from './posts.dto';
import PostsRepository from './posts.repository';


@Injectable()
export class PostsService {
  PostsRepoistorty: any;
  constructor(private readonly postRepoistorty: PostsRepository) {}
  async createPosts(userId, body: any, ): Promise<void> {
    const post = await this.postRepoistorty.createPosts(body, userId);
     return post;

    
  }
  // async getPost(): Promise<any> {
  //   const posts = await this.postRepoistorty.getposts();
  //   return posts;
  // }

  async getPosts(userId: number): Promise<any[]> {
    const users = await this.postRepoistorty.getposts(userId);

    return users;
  }

  async getPostRecord(userId:string, p: GetPostDto): Promise<GetPostDto> {
    const { id: postId } = p;
    const users = await this.postRepoistorty.getpostsrecords(userId, parseInt(postId));

    return users;
  }

  async getAllPostByUser(p: GetAllPostDto): Promise<GetAllPostDto> {
    const { userId: userId } = p;
    
    const users = await this.postRepoistorty.getAposts(parseInt(userId));

    return users;
  }
}
