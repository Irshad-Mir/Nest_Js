import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:".local.env",
    // envFilePath:".prod.env",

  }), UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

