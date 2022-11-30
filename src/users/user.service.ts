import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import {Repository} from 'typeorm'
import { AddUserArgs, UpdateUserArgs } from "./user.dto";

@Injectable()

export class UserService{
   
constructor( @InjectRepository(UserEntity) public readonly userRepo:Repository<UserEntity>){}

async findAllUsers():Promise<UserEntity[]>{
    let users=await this.userRepo.find()
    return users
}

async findUserById(id:number):Promise<UserEntity>{
   let user=await this.userRepo.findOne({where:{id:id}});
   return user 
}

async deleteUserById(id:number):Promise<string>{
    await this.userRepo.delete(id);
    return "user deleted" 
 }
 async adduser(addUserArgs:AddUserArgs):Promise<String>{
    let user:UserEntity=new UserEntity();
    user.name=addUserArgs.name;
    user.username=addUserArgs.username;
    user.email=addUserArgs.email;
    user.password=addUserArgs.password;
    await this.userRepo.save(user)
    return "Add user"
 }
 async updateuser(updateUserArgs:UpdateUserArgs):Promise<String>{
    let updateusers:UserEntity=await this.userRepo.findOne({where:{

    
    id:  updateUserArgs.id  
    }})
    updateusers.name=updateUserArgs.name;
    updateusers.username=updateUserArgs.username;
    updateusers.email=updateUserArgs.email;
    updateusers.password=updateUserArgs.password;
  
    await this.userRepo.save(updateusers)
    return "updated user"
 }

}