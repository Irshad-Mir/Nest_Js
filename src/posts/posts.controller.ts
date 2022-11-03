import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto, GetAllPostDto, GetPostDto } from './posts.dto';
import { PostsService } from './posts.service';



@Controller('post')
export class PostsController {
  constructor(private readonly postservice: PostsService) {}

  // Api 1 **************create user  ***************//

  @Post('/create')
  async createPosts(@Body() body: CreatePostDto): Promise<void> {
    return this.postservice.createPosts(body);
  }

  // Api 2 ************** get  All Posts  ***************//

  @Get('/fetch')
  async getPost() {
    return this.postservice.getPost();
  }
  // Api 3 **************get Post record by PostId  ***************//

  @Get('/fetchById/:id')
  async getPostRecord(@Param() p: GetPostDto): Promise<GetPostDto> {
    return this.postservice.getPostRecord(p);
  }

  // Api 4 **************get Posts record by UserId  ***************//

  @Get('/fetchByPostId/:userId')
  async getAllPost(@Param() p: GetAllPostDto): Promise<GetAllPostDto> {
    return this.postservice.getAllPostByUser(p);
  }
}
