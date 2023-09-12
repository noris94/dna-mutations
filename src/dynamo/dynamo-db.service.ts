import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class DynamoDbService {

    constructor(@InjectAwsService(DynamoDB) private readonly dynamoDB:DynamoDB) {}

    async getItems(params: DynamoDB.ScanInput) {
        return this.dynamoDB.scan(params).promise();
    }

    async putItem(params: DynamoDB.PutItemInput) {
        return this.dynamoDB.putItem(params).promise();
    }

    async query(params:DynamoDB.QueryInput){
        return this.dynamoDB.query(params).promise();
    }
}
