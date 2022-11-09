import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateOrderDto } from './orders.dto';

import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Api 1 **************create like  ***************//

  @Post('/create')
  async createOrders(
    @Body() body: CreateOrderDto,
    total_price: number,
  ): Promise<any> {
    console.log(total_price);
    return this.ordersService.createOrders(body, total_price);
  }

  @Get('fetch')
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
