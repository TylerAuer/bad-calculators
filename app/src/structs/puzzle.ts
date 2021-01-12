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
  'root' = 'root',
  'floor' = 'floor',
  'ceil' = 'ceiling',
  'base' = 'base conversion',
  'collatz' = 'collatz',
  'recip' = 'reciprocal',
  'abs' = 'absolute value',
  'concat_front' = 'concatenate to front',
  'concat_end' = 'concatenate to end',
  'reverse' = 'reverse the digits',
  'tet' = 'tetration',
}

export interface OpInfo {
  symbol: OpType; // Has to be an OpType
  value?: number;
  limit?: number;
}

export enum OpError {
  'BASE_INVALID_DIGIT' = 'Invalid Digit: Converting bases resulted in a digit that was a letter instead of a number.',
  'BASE_NON_INTEGERS' = 'Invalid Input: This calculator does not support converting non-integers between bases.',
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
}

export interface Solution {
  values: (number | string)[];
  actions: string[];
  opCounts: number[];
}

export const defaultPuzzle = (): Puzzle | null => null;
