import { IsUUID } from 'class-validator';
export class Product {
  userId: number;
  id?: number;
  name: string;
  price: number;
  category: string;
}

export class CreateProductDto {
  @IsUUID()
  userId: number;
  @IsUUID()
  name: string;
  @IsUUID()
  price: number;
  @IsUUID()
  category: string;
}

export class GetProductDto {
  id: string;
}
export class GetAllProductDto {
  userId: string;
}
