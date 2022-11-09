import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './orders.dto';
import OrdersRepository from './orders.repository';


@Injectable()
export class OrdersService {
  constructor(private readonly orderRepoistorty: OrdersRepository) {}

  async createOrders(body: CreateOrderDto, total_price: number): Promise<any> {
    //const p = body.productId
    total_price = body.price * body.quantity;
    console.log(total_price);
    const newCart = await this.orderRepoistorty.createOrders(
      body,

      total_price,
    );
    return newCart;
  }

  async getOrders(): Promise<any> {
    const posts = await this.orderRepoistorty.getOrders();
    return posts;
  }
}
