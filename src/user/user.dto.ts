import { IsUUID } from "class-validator";
export class User{
    id?: number;
    name: string;
    username: string;
    password: string;
}


export class CreateUserDto {
  @IsUUID()
  name: string;
  @IsUUID()
  username: string;
  @IsUUID()
  password: string;
}

export class GetUserDto {
  id: string;
}

export class DeleteUserDto{
  id:string
}

 export class UpdateusersDto {
   id: number;
   userId: number;
   postId: number;
   name: string;
   email: string;
   body: string;
 }