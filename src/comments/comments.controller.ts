import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCommentDto, GetAllCommentByUserDto, GetCommentDto } from './comments.dto';
import { CommentsService } from './comments.service';


@Controller('comment')
export class CommentsController {
  constructor(private readonly commentservice: CommentsService) {}

  // Api 1 **************create user  ***************//

  @Post('/create')
  async createComments(@Body() body: CreateCommentDto): Promise<void> {
    return this.commentservice.createComments(body);
  }

  // Api 2 ************** get  All Comments  ***************//

  @Get('/fetch')
  async getComment() {
    return this.commentservice.getComment();
  }

  // Api 3 **************get Comment record by CommentId  ***************//

  @Get('/fetchById/:id')
  async getCommentRecord(@Param() p: GetCommentDto): Promise<GetCommentDto> {
    return this.commentservice.getCommentRecord(p);
  }

  // Api 4 **************get Comments record by UserId  ***************//

  @Get('/fetchAllCommentByUserId/:userId')
  async getAllComment(
    @Param() p: GetAllCommentByUserDto,
  ): Promise<GetAllCommentByUserDto> {
    return this.commentservice.getAllComment(p);
  }
}
