import { Injectable } from '@nestjs/common';
import { Cart, CreateCartDto } from './carts.dto';
import CartsRepository from './carts.repo';


@Injectable()
export class CartsService {
  constructor(private readonly cartRepoistorty: CartsRepository) {}

 

  async createCarts(body: CreateCartDto, total_price: number,  ): Promise<any> {
    //const p = body.productId
    total_price = body.price * body.quantity;
    console.log(total_price);
    const newCart = await this.cartRepoistorty.createCarts(
      body,

      total_price,
    );
    return newCart;
  }
 

  async getCarts(): Promise<any> {
    const posts = await this.cartRepoistorty.getCarts();
    return posts;
  }
}