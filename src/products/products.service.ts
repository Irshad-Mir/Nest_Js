import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './products.dto';
import ProductsRepository from './products.repo';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async createProduct(body: any): Promise<void> {
    const post = await this.productsRepository.createProduct(body);
    return post;
  }

  async getProduct(): Promise<any> {
    const posts = await this.productsRepository.getproducts();
    return posts;
  }
}
