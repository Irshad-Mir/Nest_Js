import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteUserDto, GetUserDto, LoginDto } from './user.dto';
import UserRepository from './user.repository';
 import { AuthService } from 'src/security/password.hash';



@Injectable()
export class UserService {
  constructor(
    private readonly userRepoistorty: UserRepository,
    private readonly AuthService: AuthService,
  ) {}
  async createUsers(body: any): Promise<void> {

  
    
    const password = await this.AuthService.hashPassword(body.password);
    
    body.password = password;
    
   
    const user = await this.userRepoistorty.createUsers(body);
    return user;
  }

  async getUser(): Promise<any> {
    const users = await this.userRepoistorty.getusers();
    return users;
  }

  async getUserRecord(p: GetUserDto): Promise<GetUserDto> {
    const { id: userId } = p;
    const users = await this.userRepoistorty.getusersRecord(parseInt(userId));

    return users;
  }

  async deleteUserById(p: DeleteUserDto): Promise<DeleteUserDto> {
    const { id: userId } = p;
    const users = await this.userRepoistorty.deleteuser(parseInt(userId));
    return users;
  }

  async userUpdate(body: any, id: any): Promise<void> {
    const user = await this.userRepoistorty.usersUpdate(body, id);
    return user;
  }


 

}
