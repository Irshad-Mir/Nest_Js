import { Module } from '@nestjs/common';

import { CartsController } from './carts.controller';
import { HasuraService } from 'src/service/hasura.service';
import { ConfigService } from '@nestjs/config';
import { CartsService } from './carts.service';
import CartsRepository from './carts.repo';

@Module({
  providers: [CartsService, CartsRepository, HasuraService, ConfigService],

  controllers: [CartsController],
  exports: [CartsRepository, CartsService],
})
export class CartsModule {}
