import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

let cachedServer;

export const handler = async (event, context) => {
    if (!cachedServer) {
        const nestApp = await NestFactory.create(AppModule,{
            logger:['error','warn']
        });
        nestApp.enableCors();
        nestApp.use(helmet());
        nestApp.useGlobalPipes(new ValidationPipe());
        await nestApp.init();
        cachedServer = serverlessExpress({
            app: nestApp.getHttpAdapter().getInstance(),
        });
    }

    return cachedServer(event, context);
};