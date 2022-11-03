import { Injectable } from '@nestjs/common';
import { GetAllLikeByUserDto, GetLikeDto } from './likes.dto';
import LikesRepository from './likes.repo';


@Injectable()
export class LikesService {
  constructor(private readonly likeRepoistorty: LikesRepository) {}
  async createLikes(body: any): Promise<void> {
    const post = await this.likeRepoistorty.createLikes(body);
    return post;
  }
  async getLike(): Promise<any> {
    const posts = await this.likeRepoistorty.getLikes();
    return posts;
  }
  async getLikeRecord(p: GetLikeDto): Promise<GetLikeDto> {
    const { id: likeId } = p;
    const users = await this.likeRepoistorty.getlikesRecords(parseInt(likeId));

    return users;
  }

  async getAllLike(p: GetAllLikeByUserDto): Promise<GetAllLikeByUserDto> {
    const { userId: userId } = p;
    const comments = await this.likeRepoistorty.getlikesAll(parseInt(userId));

    return comments;
  }
}
