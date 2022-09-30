import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:[".local.env"],
   

  }), MongooseModule.forRootAsync({
    imports:[ConfigModule],
    useFactory:(configService:ConfigService)=>({uri:configService.get("MONGO-URI")}),
      inject:[ConfigService]
  }), BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

