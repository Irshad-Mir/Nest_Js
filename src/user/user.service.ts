import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
 
  constructor(@InjectModel('User') private readonly userModel:Model<UserDocument>){}

  async addUser(createUserDto: CreateUserDto):Promise<User> {
const newUser=await this.userModel.create(createUserDto);
newUser.password=await bcrypt.hash(newUser.password, 10)
return newUser.save();
  }
  async findUser(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({username: username});
    return user;
  }


  findAll() {
    return ;
  }

  async getUser(id: string): Promise<User> {
    const product = await this.userModel.findById(id).exec();
    return product;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
