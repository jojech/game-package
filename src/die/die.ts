export interface DieOptions {
  sides: number;
  faces?: DieFace[];
  defaultColor?: string;
  label?: string;
}

export interface DieFace {
  descriptor?: string;
  symbols?: string[];
  value?: number;
  color?: string;
}

export interface DieResult {
  [key: string]: number;
}

export default class Die {
  private sides: number;
  private faces: DieFace[];
  private defaultColor: string;
  private label: string;
  private currentResult: DieFace | null = null;

  constructor({ sides = 6, faces = [], defaultColor = 'red', label = '' }: DieOptions) {
    this.sides = sides;

    this.faces = this.createFaces(faces);
    
    this.defaultColor = defaultColor;
    this.label = label;
  }

  createFaces( faces: DieFace[] = [] ): DieFace[] {
    const requiredSides = this.sides;

    if ( faces.length === 0 ) faces = Array.from({ length: requiredSides }, (_, i) => ({ value: i + 1 }));
    else if ( faces.length < requiredSides ) {
      const additionalFaces = Array.from({ length: requiredSides - faces.length }, (_, i) => ({ value: 0, symbols: [''] }));
      faces.push(...additionalFaces);
    }

    return faces.slice(0, requiredSides);
  }

  roll(): DieFace {
    const rolledFace = this.faces[Math.floor(Math.random() * this.faces.length)];

    this.currentResult = {
      ...rolledFace,
      color: rolledFace.color ? rolledFace.color : this.defaultColor
    };
    
    return this.currentResult;
  }

  getCurrentResult(): DieFace {
    return this.currentResult ? this.currentResult : this.roll();
  }
}

export class DicePool {
  private dice: Die[];

  constructor(dice: Die[] = []) {
    this.dice = dice;
  }

  rollAll(): DieFace[] {
    return this.dice.map(die => die.roll());
  }

  seeResults(): DieFace[] {
    return this.dice.map(die => die.getCurrentResult()) as DieFace[];
  }

  addDie(die: Die): void {
    this.dice.push(die);
  }

  sumResults(): DieResult {
    const results = this.seeResults();

    return results.reduce((acc: DieResult, face: DieFace) => {
      if ( face.symbols ) {
        face.symbols.forEach(symbol => {
          if ( symbol ) {
            if ( acc[symbol] ) acc[symbol] += 1;
            else acc[symbol] = 1;
          }
        });
      }
      if ( face.value ) {
        if ( acc['value'] ) acc['value'] += face.value;
        else acc['value'] = face.value;
      }

      return acc;
    }, {} as DieResult);
  }
}