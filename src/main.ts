import { NestFactory } from '@nestjs/core';
import { Console } from 'console';

import { AppModule } from './app.module';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  await app.listen(3000);
}
bootstrap();
