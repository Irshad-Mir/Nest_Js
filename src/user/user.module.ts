import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Console } from 'console';


@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class UserModule {
    constructor(private readonly configService:ConfigService){
        console.log("User module" + " " + configService.get<number>("PORT"));
       console.log("User module" + "  "  + configService.get<boolean>("LOGGING"));
    }
}

