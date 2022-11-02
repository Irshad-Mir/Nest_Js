import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './posts.dto';
import { PostsService } from './posts.service';



@Controller('post')
export class PostsController {
  constructor(private readonly postservice: PostsService) {}

  @Post('/create')
  async createPosts(@Body() body: CreatePostDto): Promise<void> {
    return this.postservice.createPosts(body);
  }
  @Get('/fetch')
  async getPost() {
    return this.postservice.getPost();
  }
    
}
