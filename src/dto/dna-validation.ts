import { IsString, Matches } from 'class-validator';

export class DNAValidationDTO {
  @IsString({ each: true }) 
  @Matches(/^[ATCG]+$/, { each: true,message:'Each string must have only A, T, C or G letters' })
  readonly dna: string[];
}