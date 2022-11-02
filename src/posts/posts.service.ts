import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './posts.dto';
import PostsRepository from './posts.repository';


@Injectable()
export class PostsService {
  
  PostsRepoistorty: any;
  constructor(private readonly postRepoistorty: PostsRepository) {}
  async createPosts(body: any): Promise<void> {
    const post = await this.postRepoistorty.createPosts(body);
    return post;
  }
  async getPost(): Promise<any> {
    const posts = await this.postRepoistorty.getposts();
    return posts;
  }
}
