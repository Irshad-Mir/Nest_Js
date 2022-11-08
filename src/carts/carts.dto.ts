import { IsUUID } from 'class-validator';
export class Cart {
    
    
  id?: number;
  userId: number;
  productId: number;
    quantity: number;
    price: number;
    total_price: number;
 
  
}

export class CreateCartDto {
  @IsUUID()
  userId: number;
  @IsUUID()
  productId: number;
  @IsUUID()
  quantity: number;
  @IsUUID()
  price: number;
  @IsUUID()
  total_price: number;
}

export class GetCartDto {
  id: string;
}
export class GetAllCartDto {
  userId: string;
}
