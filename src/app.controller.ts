import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'
import { DynamoDbService } from './dynamo/dynamo-db.service';
import { PutItemInput, QueryInput, ScanInput } from 'aws-sdk/clients/dynamodb';
import { DNAValidationDTO } from './dto/dna-validation';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly dynamoDBService:DynamoDbService) {}

  @Get('stats')
  async getStats(@Res() res:Response){
    try {
      const params:ScanInput = {
        TableName:'mutationsHistory',
        FilterExpression: 'hasMutations = :value',
        ExpressionAttributeValues: {
          ':value': { BOOL: true }
        }
      }
      const {Count,ScannedCount} = await this.dynamoDBService.getItems(params)

      const response = {
        count_mutations:Count,
        count_no_mutation:ScannedCount-Count,
        ratio:Count/(ScannedCount-Count)
      }

      return res.json(response)
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Post('mutation')
  async mutation(@Body() dnaValidationDTO:DNAValidationDTO,@Res() res:Response) {
    try {
      const dna=dnaValidationDTO.dna as unknown as string[];
      const dnaExists = await this.validateIfDNAExists(dna);
      if(dnaExists){
        res.status(HttpStatus.CONFLICT).json({message:'This DNA has already been saved before'})
        return;
      }

      const hasMutations = this.appService.hasMutation(dna);

      const params:PutItemInput = {
        TableName:'mutationsHistory',
        Item:{
          id:{S:this.appService.getId(dna)},
          dna:{SS:dna},
          hasMutations:{BOOL:hasMutations}
        }
      }
      await this.dynamoDBService.putItem(params)

      if(hasMutations){
        res.status(HttpStatus.OK).json({hasMutations})
      }else{
        res.status(HttpStatus.FORBIDDEN).json({hasMutations})
      }
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
    
  }

  async validateIfDNAExists(dna:string[]){
    const paramsQuery:QueryInput={
      TableName:'mutationsHistory',
      KeyConditionExpression:'id=:id',
      ExpressionAttributeValues:{
        ':id':{S:this.appService.getId(dna)}
      }
    }

    const dnaExists = await this.dynamoDBService.query(paramsQuery);
    return dnaExists.Count>0;
  }
}
