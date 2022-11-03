import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto, GetUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  //  Api 1**************User create Api ***************//

  @Post('/create')
  async createUsers(@Body() body: CreateUserDto): Promise<void> {
    return this.userservice.createUsers(body);

    // Api 2 **************get  All Users   ***************//
  }
  @Get('/fetch')
  async getUser() {
    return this.userservice.getUser();
  }

  // Api 3 **************get User record by UserId  ***************//

  @Get('/fetchById/:id')
  async getuserrecord(@Param() p: GetUserDto): Promise<GetUserDto> {
    return this.userservice.getUserRecord(p);
  }
}
