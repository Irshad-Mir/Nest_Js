import { Injectable } from '@nestjs/common';
import { CreatePostDto, GetAllPostDto, GetPostDto } from './posts.dto';
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

  async getPostRecord(p: GetPostDto): Promise<GetPostDto> {
    const { id: postId } = p;
    const users = await this.postRepoistorty.getpostsrecords(parseInt(postId));

    return users;
  }

  async getAllPostByUser(p: GetAllPostDto): Promise<GetAllPostDto> {
    const { userId: userId } = p;
    const users = await this.postRepoistorty.getAposts(parseInt(userId));

    return users;
  }
}
