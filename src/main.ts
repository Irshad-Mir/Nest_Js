import { NestFactory } from '@nestjs/core';
import { Console } from 'console';

import { AppModule } from './app.module';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.port);
  console.log(process.env.logging);
  
  await app.listen(3000);
}
bootstrap();
