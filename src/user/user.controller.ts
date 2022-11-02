import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Post('/create')
  async createUsers(@Body() body: CreateUserDto): Promise<void> {
    return this.userservice.createUsers(body);
  }
  @Get('/fetch')
  async getUser() {
    return this.userservice.getUser();
  }
  @Get('/fetchById/:id')
  async getUsers(@Param('id') id: number) {
    return this.userservice.getUsers(id);
  }
}
