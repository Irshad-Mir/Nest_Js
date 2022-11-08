import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCartDto, GetCartDto } from './carts.dto';
import { CartsService } from './carts.service';

;


@Controller('cart')
export class CartsController {
  constructor(private readonly cartservice: CartsService) {}

  // Api 1 **************create like  ***************//

  @Post('/create')
  async createCarts(
    @Body() body: CreateCartDto,
    total_price: number,
  ): Promise<any> {
    console.log(total_price);
    return this.cartservice.createCarts(body, total_price,);
  }

  @Get('fetch')
  async getCarts() {
    return this.cartservice.getCarts();
  }
}