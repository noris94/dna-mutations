import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger:['error','warn']
  });
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
