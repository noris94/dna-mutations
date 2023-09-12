import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoDBModule } from './dynamo/dynamo.module';
import { AwsSdkModule } from 'nest-aws-sdk';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    DynamoDBModule,
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useValue: {
          region:'us-east-1',
          credentials:{
              accessKeyId: process.env.ACCESS_KEY_ID_AWS,
              secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
          }
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
