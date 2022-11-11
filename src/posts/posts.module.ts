import { Module } from '@nestjs/common';

import { HasuraService } from 'src/service/hasura.service';

import { ConfigService } from '@nestjs/config';
import { PostsService } from './posts.service';
import PostsRepository from './posts.repository';
import { PostsController } from './posts.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/security/auth/auth.service';


@Module({
  providers: [
    PostsService,
    PostsRepository,
    HasuraService,
    ConfigService,
    AuthService,
    JwtService,
  ],

  controllers: [PostsController],
  exports: [PostsRepository, PostsService, AuthService,]
})
export class PostsModule {}
