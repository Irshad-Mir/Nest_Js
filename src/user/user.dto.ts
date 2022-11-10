import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";
export class User {
  id?: string;
  name: string;
  username: string;
  email?: string;
  password: string;
  role: string;
  refresh_token: string;
}


export class CreateUserDto {
  name: string;

  username: string;
  role: string;
  email: string;
  password: string;
  refresh_token: string;
}

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
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
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: string;
}