import { IsUUID } from 'class-validator';
export class Like {
  userId: number;
  postId: number;
  id?: number;
  likes: number;

}

export class CreateLikeDto {
  @IsUUID()
  userId: number;
  @IsUUID()
  postId: number;
    @IsUUID()
    like: number;
  
}

export class GetLikeDto {
  id: string;
}

export class GetAllLikeByUserDto {
  userId: string;
}


