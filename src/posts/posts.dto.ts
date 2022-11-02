import { IsUUID } from 'class-validator';
export class Post {
 userId: number;
  id?: number;
  title: string;
  body: string;
 
}

export class CreatePostDto {
  @IsUUID()
  userId: number;
  @IsUUID()
  title: string;
  @IsUUID()
  body: string;
}
