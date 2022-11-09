import { IsEnum, IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";
export class User{
    id?: number;
    name: string;
    username: string;
    password: string;
}


export class CreateUserDto {
  name: string;

  username: string;
 
 
  password: string;
  refresh_token: string;
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
 
export class LoginDto {
  @IsString()
  
  username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
  
}