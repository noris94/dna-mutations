import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
    let service: AppService;

    const dna1=[
        "ATGCGA", 
        "CAGTGC", 
        "TTATGT", 
        "AGAAGG", 
        "CCCCTA",
        "TCACTG"
    ];

    const dna2=[
        "ATGCGA",
        "CAGTGC",
        "TTATAT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ];

    const dna3=[
        "ATGCGA",
        "CCGTGC",
        "TTATAT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ];

    const dna4=[
        "ATGCGA",
        "CCGTGC",
        "TTATAT",
        "AGAAGG",
        "CCTCTA",
        "TCACTG"
    ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('hasMutations',()=>{
    expect(service.hasMutation(dna1)).toBe(true);
    expect(service.hasMutation(dna2)).toBe(true);
    expect(service.hasMutation(dna3)).toBe(false);
    expect(service.hasMutation(dna4)).toBe(false);
  })
});
