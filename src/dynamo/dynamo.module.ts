import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { DynamoDbService } from './dynamo-db.service';
import {DynamoDB} from 'aws-sdk';

@Module({
    imports: [AwsSdkModule.forFeatures([DynamoDB])],
    providers: [ DynamoDbService],
    exports: [DynamoDbService],
})
export class DynamoDBModule {}
