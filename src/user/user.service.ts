import { Injectable } from '@nestjs/common';
import { DeleteUserDto, GetUserDto } from './user.dto';
import UserRepository from './user.repository';


@Injectable()
export class UserService {
  constructor(private readonly userRepoistorty: UserRepository) {}
  async createUsers(body: any): Promise<void> {
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
