import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCommentDto } from './comments.dto';
import { CommentsService } from './comments.service';


@Controller('comment')
export class CommentsController {
  constructor(private readonly commentservice: CommentsService) {}

  @Post('/create')
  async createComments(@Body() body: CreateCommentDto): Promise<void> {
    return this.commentservice.createComments(body);
  }
  @Get('/fetch')
  async getComment() {
    return this.commentservice.getComment();
  }
}
