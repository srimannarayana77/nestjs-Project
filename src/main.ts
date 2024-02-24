import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { configData } from './config/appConfig.';
import { ValidationPipe } from '@nestjs/common';
dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  await app.listen(configData.port);
}
bootstrap();
