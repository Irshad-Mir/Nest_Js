import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ConfigService } from '@nestjs/config';
import { HasuraService } from 'src/service/hasura.service';
import ProductsRepository from './products.repo';

@Module({
  providers: [
    ProductsService,
    ProductsRepository,
    HasuraService,
    ConfigService,
  ],

  controllers: [ProductsController],
  exports: [ProductsRepository, ProductsService],
})
export class ProductsModule {}
