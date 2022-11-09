import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HasuraService } from 'src/service/hasura.service';

import { ConfigService } from '@nestjs/config';
import UserRepository from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/security/password.hash';



@Module({
  providers: [
    UserService,
    UserRepository,
    HasuraService,
    ConfigService,
    AuthService,
    JwtService,
  ],

  controllers: [UserController],
  exports: [UserRepository, UserService, AuthService],
})
export class UserModule {}