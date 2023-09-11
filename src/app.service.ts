import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getStats(){

  }

  hasMutation(dna:string[]):boolean{
    
    let same4ConsecutiveLettersCount = 0;
    const horizontalSequencesCount = this.validateHorizontally(dna);
    same4ConsecutiveLettersCount+=horizontalSequencesCount;

    if(same4ConsecutiveLettersCount>1) return true;

    const verticalSequencesCount = this.validateVertically(dna);
    same4ConsecutiveLettersCount+=verticalSequencesCount;

    if(same4ConsecutiveLettersCount>1) return true;

    const oblicuousSequencesCount = this.validateOblicuous(dna)
    same4ConsecutiveLettersCount+=oblicuousSequencesCount;

    return same4ConsecutiveLettersCount>1;
  }

  validateHorizontally(dna:string[]):number{
    let same4ConsecutiveLettersCount =0;

    for(let i=0;i<dna.length;i++){
      const row = dna[i];
      const hasMutations = this.validateRow(row);
      
      if(hasMutations){
        same4ConsecutiveLettersCount++;
      }
      
    }

    return same4ConsecutiveLettersCount;
  }

  validateVertically(dna:string[]):number{
    let same4ConsecutiveLettersCount =0;

    for(let i=0;i<dna.length;i++){
      let columnString = '';

      for(let j=0;j<dna.length;j++){
        columnString+= dna[j][i];
      }

      const hasMutations= this.validateRow(columnString);
      if(hasMutations){
        same4ConsecutiveLettersCount++;
      }
    }

    return same4ConsecutiveLettersCount;
  }

  validateRow(row:string):boolean{
    let hasSame4ConsecutiveLetters = false;
    let sameLetterCount=1;
    let lastLetter:string = '';

    for(let j=0;j<row.length;j++){
      const letter = row[j];
      if(lastLetter===letter){
        sameLetterCount++;
      }else{
        sameLetterCount=1;
      }
      lastLetter=letter;
      if(sameLetterCount==4){
        hasSame4ConsecutiveLetters=true;
        console.log('mutation found in ',row);
        break;
      }
    }

    return hasSame4ConsecutiveLetters;
  }

  validateOblicuous(dna:string[]){
    const matrix = dna.map(row=>row.split(''))
    const diagonals = this.obtenerDiagonales(matrix);

    let same4ConsecutiveLettersCount = 0;

    for (let i = 0; i < diagonals.length; i++) {
      const diagonal = diagonals[i].join('');
      const hasMutations = this.validateRow(diagonal);
      if(hasMutations){
        same4ConsecutiveLettersCount++;
      }
    }

    return same4ConsecutiveLettersCount;
  }

  obtenerDiagonales(matriz: string[][]): string[][]{
    const N = matriz.length;
    const diagonales: string[][] = [];
  
    // Diagonales de arriba a abajo (izquierda a derecha)
    for (let i = 0; i < N; i++) {
      const diagonal: string[] = [];
      for (let j = 0; j <= i; j++) {
        diagonal.push(matriz[j][i - j]);
      }
      diagonales.push(diagonal);
    }
  
    for (let i = 1; i < N; i++) {
      const diagonal: string[] = [];
      for (let j = 0; j < N - i; j++) {
        diagonal.push(matriz[i + j][N - 1 - j]);
      }
      diagonales.push(diagonal);
    }
  
    // Diagonales de arriba a abajo (derecha a izquierda)
    for (let i = 0; i < N; i++) {
      const diagonal: string[] = [];
      for (let j = 0; j <= i; j++) {
        diagonal.push(matriz[j][N - 1 - i + j]);
      }
      diagonales.push(diagonal);
    }
  
    for (let i = 1; i < N; i++) {
      const diagonal: string[] = [];
      for (let j = 0; j < N - i; j++) {
        diagonal.push(matriz[i + j][j]);
      }
      diagonales.push(diagonal);
    }
  
    return diagonales;
  }
  
}
