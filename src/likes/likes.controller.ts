import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLikeDto, GetAllLikeByUserDto, GetLikeDto } from './likes.dto';
import { LikesService } from './likes.service';


@Controller('like')
export class LikesController {
  constructor(private readonly likeservice: LikesService) {}

  // Api 1 **************create like  ***************//

  @Post('/create')
  async createLikes(@Body() body: CreateLikeDto): Promise<void> {
    return this.likeservice.createLikes(body);
  }

  // Api 2 ************** get  All likes  ***************//

  @Get('/fetch')
  async getLike() {
    return this.likeservice.getLike();
  }

  // Api 3 **************get like record by CommentId  ***************//

  @Get('/fetchById/:id')
  async getLikeRecord(@Param() p: GetLikeDto): Promise<GetLikeDto> {
    return this.likeservice.getLikeRecord(p);
  }

  // Api 4 **************get likes record by UserId  ***************//

  @Get('/fetchAllLikeByUserId/:userId')
  async getAllLike(
    @Param() p: GetAllLikeByUserDto,
  ): Promise<GetAllLikeByUserDto> {
    return this.likeservice.getAllLike(p);
  }
}
