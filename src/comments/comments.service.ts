import { Injectable } from '@nestjs/common';
import { GetAllCommentByUserDto, GetCommentDto } from './comments.dto';
import CommentsRepository from './comments.repository';

@Injectable()
export class CommentsService {
  getAllComments(
    p: GetAllCommentByUserDto,
  ):
    | import('./comments.dto').GetAllCommentByUserDto
    | PromiseLike<import('./comments.dto').GetAllCommentByUserDto> {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly commentRepoistorty: CommentsRepository) {}
  async createComments(body: any): Promise<void> {
    const post = await this.commentRepoistorty.createComments(body);
    return post;
  }
  async getComment(): Promise<any> {
    const posts = await this.commentRepoistorty.getcomments();
    return posts;
  }
  async getCommentRecord(p: GetCommentDto): Promise<GetCommentDto> {
    const { id: commentId } = p;
    const users = await this.commentRepoistorty.getcommentsRecords(
      parseInt(commentId),
    );

    return users;
  }

  async getAllComment(
    p: GetAllCommentByUserDto,
  ): Promise<GetAllCommentByUserDto> {
    const { userId: userId } = p;
    const comments = await this.commentRepoistorty.getcommentsAll(
      parseInt(userId),
    );

    return comments;
  }
}
