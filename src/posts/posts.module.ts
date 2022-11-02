import { Module } from '@nestjs/common';

import { HasuraService } from 'src/service/hasura.service';

import { ConfigService } from '@nestjs/config';
import { PostsService } from './posts.service';
import PostsRepository from './posts.repository';
import { PostsController } from './posts.controller';


@Module({
  providers: [PostsService, PostsRepository, HasuraService, ConfigService],

  controllers: [PostsController],
  exports: [PostsRepository, PostsService],
})
export class PostsModule {}
