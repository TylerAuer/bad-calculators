export interface Star {
  moves: number;
  goalRelation?: 'more' | 'fewer' | 'exactly';
}

export enum OpType {
  'add' = 'addition',
  'sub' = 'subtraction',
  'mult' = 'multiplication',
  'div' = 'division',
  'expo_power' = 'exponentiation with fixed power',
  'expo_base' = 'exponentiation with fixed base',
  'mod' = 'modulo',
  'fact' = 'factorial',
  'root' = 'root', // Not yet built
  'floor' = 'floor', // Not yet built
  'ceil' = 'ceiling', // Not yet built
  'base' = 'base conversion',
  'collatz' = 'collatz',
  'recip' = 'reciprocal', // Not yet built
  'abs' = 'absolute value',
  'concat_front' = 'concatenate to front', // Not yet built
  'concat_end' = 'concatenate to end', // Not yet built
  'reverse' = 'reverse the digits',
  'tet' = 'tetration', // Not yet built
  'look_and_say' = 'look and say',
}

export interface OpInfo {
  symbol: OpType; // Has to be an OpType
  value?: number;
  limit?: number;
}

export enum OpError {
  'BASE_INVALID_DIGIT' = 'Invalid Digit: Converting bases resulted in a digit that was a letter instead of a number.',
  'BASE_NON_INTEGERS' = 'Invalid Input: This calculator does not support converting non-integers between bases.',
  'LOOK_AND_SAY_DECIMAL' = 'Invalid Input: Look and Say can only work with integers.',
  'DIVIDE_BY_ZERO' = 'Undefined: Dividing by zero is undefined and cannot be processed by this Bad Calculator',
}

export interface ProcessedOp {
  text: string;
  op: (prev: number) => number | OpError;
  limit: number;
}

export interface Puzzle {
  id: number;
  level: number;
  indexInLevel: number;
  disabled: boolean;
  creator: string;
  start: number;
  target: number;
  maxMoves: number | null;
  operations: OpInfo[];
  blocks: number[];
  stars: Star[];
  attemptCount?: number;
  successCount?: number;
  difficulty?: {
    discrete: number;
    ordinal: number;
    raw: number;
    countOfPuzzles: number;
  };
}

export interface Solution {
  values: (number | string)[];
  actions: string[];
  opCounts: number[];
}

export const defaultPuzzle = (): Puzzle | null => null;
