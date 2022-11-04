import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateProductDto } from './products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create')
  async createProduct(@Body() body: CreateProductDto): Promise<void> {
    return this.productsService.createProduct(body);
  }

  @Get('/fetch')
  async getProduct() {
    return this.productsService.getProduct();
  }
}
