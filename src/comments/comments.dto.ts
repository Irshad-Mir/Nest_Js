import { IsUUID } from 'class-validator';
export class Comment {
  userId: number;
  postId: number;
  id?: number;
  name: string;
  email: string;
  body: string;
}

export class CreateCommentDto {
  @IsUUID()
  userId: number;
  @IsUUID()
  postId: number;
  @IsUUID()
  name: string;
  @IsUUID()
  email: string;
  @IsUUID()
  body: string;
}
