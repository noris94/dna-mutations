import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('stats')
  getStats(){

  }

  @Post('mutation')
  mutation(@Body('dna') dna: string[],@Res() res:Response) {
    const hasMutations = this.appService.hasMutation(dna);
    
    if(hasMutations){
      res.status(HttpStatus.OK).json({hasMutations})
    }else{
      res.status(HttpStatus.FORBIDDEN).json({hasMutations})
    }
  }
}
