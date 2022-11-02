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