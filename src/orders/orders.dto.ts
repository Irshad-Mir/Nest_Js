import { IsUUID } from 'class-validator';
export class Order {
  id?: number;
  userId: number;
  cartId: number;
  quantity: number;
  price: number;
    total_price: number;
    status: string;
    created_at: Date;
}

export class CreateOrderDto {
  @IsUUID()
  userId: number;
  @IsUUID()
  cartId: number;
  @IsUUID()
  quantity: number;
  @IsUUID()
  price: number;
  @IsUUID()
  total_price: number;
  @IsUUID()
  status: string;
}

export class GetOrderDto {
  id: string;
}
export class GetAllOrderDto {
  userId: string;
}
