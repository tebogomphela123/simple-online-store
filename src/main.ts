import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookiePasrser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookiePasrser());
  app.enableCors({
    origin: ['http://localhost:4444', 'http://localhost:4555', 'http://localhost:4666'],
    credentials: true,

  }
  );
  await app.listen(3000);
}
bootstrap();
