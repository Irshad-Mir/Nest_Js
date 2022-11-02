import { Injectable } from '@nestjs/common';
import CommentsRepository from './comments.repository';

@Injectable()
export class CommentsService {

  constructor(private readonly commentRepoistorty: CommentsRepository) {}
  async createComments(body: any): Promise<void> {
    const post = await this.commentRepoistorty.createComments(body);
    return post;
  }
  async getComment(): Promise<any> {
    const posts = await this.commentRepoistorty.getcomments();
    return posts;
  }
   
   
   
   
}
