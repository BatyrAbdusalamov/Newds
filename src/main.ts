import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST','PUT','PATCH','OPTIONS'],
    credentials: true,
  });
  await app.listen(configService.get('PORT'))
  app.useGlobalPipes(new ValidationPipe());
  console.log('server start on: ', configService.get('PORT'))
}
bootstrap();

