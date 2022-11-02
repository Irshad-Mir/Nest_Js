import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HasuraService } from 'src/service/hasura.service';

import { ConfigService } from '@nestjs/config';
import UserRepository from './user.repository';



@Module({
  providers: [UserService, UserRepository, HasuraService, ConfigService ],
  

  controllers: [UserController],
  exports:[UserRepository, UserService]
 
})
export class UserModule {}