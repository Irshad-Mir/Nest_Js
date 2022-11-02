import { Module } from '@nestjs/common';

import { HasuraService } from 'src/service/hasura.service';

import { ConfigService } from '@nestjs/config';
import { CommentsService } from './comments.service';
import CommentsRepository from './comments.repository';
import { CommentsController } from './comments.controller';


@Module({
  providers: [CommentsService, CommentsRepository, HasuraService, ConfigService],

  controllers: [CommentsController],
  exports: [CommentsRepository, CommentsService],
})
export class CommentsModule {}
