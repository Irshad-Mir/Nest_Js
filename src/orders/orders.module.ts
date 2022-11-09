



import { Module } from '@nestjs/common';


import { HasuraService } from 'src/service/hasura.service';
import { ConfigService } from '@nestjs/config';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import OrdersRepository from './orders.repository';



@Module({
  providers: [OrdersService, OrdersRepository, HasuraService, ConfigService],

  controllers: [OrdersController],
  exports: [OrdersRepository, OrdersService],
})
export class OrdersModule {}
