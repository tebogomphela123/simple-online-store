import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookiePasrser from 'cookie-parser';
import { SwaggerModule, 
         DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookiePasrser());
  app.enableCors({
      origin: ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:9000'],
      // origin: "*",
      methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      // optionsSuccessStatus: 200,
      credentials: true,
    }
  );
  const config = new DocumentBuilder()
    .setTitle('Onlinse Store')
    .setVersion('v0.0.1')
    .addTag('store')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
