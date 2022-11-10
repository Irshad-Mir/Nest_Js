import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, DeleteUserDto, GetUserDto, LoginDto, UpdateusersDto } from './user.dto';
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

  @Delete('/deleteById/:id')
  async deleteuserrecord(@Param() p: DeleteUserDto): Promise<DeleteUserDto> {
    return this.userservice.deleteUserById(p);
  }

  @Put('/update/:id')
  async updateComment(@Param('id') id: string, @Body() body: UpdateusersDto) {
    return this.userservice.userUpdate(body, parseInt(id));
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.userservice.login(body);
  }
}
