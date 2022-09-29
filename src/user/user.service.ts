import { Injectable } from "@nestjs/common";
import { CONSTANTS } from "src/constants";
import { User } from "./user.schema";

@Injectable()
export class UserService{

    public users:User[]=[
        {
            username:'User1',
            password:'admin',
            email:'user1@gmail.com',
            age:22,
            role:CONSTANTS.ROLES.SOFTWARE_DEVELOPER
        },
        {
            username:'User2',
            password:'admin',
            email:'user2@gmail.com',
            age:23,
            role:CONSTANTS.ROLES.SOFTWARE_DEVELOPER

        },
        {
            username:'User3',
            password:'admin',
            email:'user3@gmail.com',
            age:25,
            role:CONSTANTS.ROLES.NODEJS_DEVELOPER
        }
    ];
    getUserByUserName(userName:string):User{
        return this.users.find((user:User)=>user.username===userName)


    }

}