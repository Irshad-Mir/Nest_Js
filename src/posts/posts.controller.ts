import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
 import { AuthGuard } from '../security/guards/auth.guard';
 import { Roles } from 'src/security/decorators/roles.decorator';
 import { RolesGuard } from 'src/security/guards/role.guard';
import { CreatePostDto, GetAllPostDto, GetPostDto } from './posts.dto';
import { PostsService } from './posts.service';
import { User } from 'src/user/user.dto';
import { GetUser } from 'src/security/decorators/get.user.decorator';



@Controller('post')
export class PostsController {
  constructor(private readonly postservice: PostsService) {}

  // Api 1 **************create user  ***************//

  @Post('/create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  async createPosts(@GetUser() user: User, @Body() body: CreatePostDto): Promise<void> {
    
    return this.postservice.createPosts(body, user.id );
  }

  // Api 2 ************** get  All Posts  ***************//

  @Get('/fetch')
  async getPosts(
    @GetUser() user: User,
    @Body() body: CreatePostDto,
  ): Promise<void> {
    //   return this.postservice.getPosts(user.id, body);
  }
  // Api 3 **************get Post record by PostId  ***************//

  @Get('/fetchById/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  async getPostRecord(
    @GetUser() user: User,
    @Param() p: GetPostDto,
  ): Promise<GetPostDto> {
    return this.postservice.getPostRecord(user.id, p);
  }

  // Api 4 **************get Posts record by UserId  ***************//
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  @Get('/fetchPosts/:userId')
  async getAllPost(@Param() p: GetAllPostDto): Promise<GetAllPostDto> {
    return this.postservice.getAllPostByUser(p);
  }
}
