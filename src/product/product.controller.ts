import { Controller, Get, Post, Body, Put, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, FilterProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProduct(@Body() createProductDto: CreateProductDto) {
    const product=await this.productService.addProduct(createProductDto);
    return product;
  }

  @Get()
  async getProducts(@Query() filterProductDto:FilterProductDto) {
    if(Object.keys(filterProductDto).length){
      const filteredProducts=await this.productService.getFilteredProducts(filterProductDto)
      return filteredProducts;
    }else{
      const allProducts=await this.productService.getAllProducts();
      return allProducts
    }
   
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDto) {
    const product = await this.productService.updateProduct(id, createProductDTO);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }
}
