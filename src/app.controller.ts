import { Controller, Get, Post, UseFilters, UseGuards, Request } from "@nestjs/common";



@Controller('app')
export class AppController {
  
   


    @Get('/get')
    helloWorld():string{
        return 'Hellow World'
    }
    

   
}
