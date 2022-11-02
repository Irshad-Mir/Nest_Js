import { Injectable } from '@nestjs/common';
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

  async getUsers(id:number) {
    const users = await this.userRepoistorty.getuser();
    return users;
  }
}
