import { Module } from '@nestjs/common';

import { HasuraService } from 'src/service/hasura.service';

import { ConfigService } from '@nestjs/config';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import LikesRepository from './likes.repo';


@Module({
  providers: [LikesService, LikesRepository, HasuraService, ConfigService],

  controllers: [LikesController],
  exports: [LikesRepository, LikesService],
})
export class LikesModule {}
