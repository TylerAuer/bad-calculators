export interface Star {
  value: number; // How many pts it is worth
  moves?: number;
  goalRelation?: 'more' | 'fewer' | 'exactly';
}

export enum OpType {
  'add' = 'addition',
  'sub' = 'subtraction',
  'mult' = 'multiplication',
  'div' = 'division',
  'pow' = 'power',
  'mod' = 'modulo',
  'fact' = 'factorial',
  'root' = 'root',
  'floor' = 'floor',
  'ceil' = 'ceiling',
  'base2' = 'base2',
  'collatz' = 'collatz',
  'recip' = 'reciprocal',
  'abs' = 'absolute value',
  'concat' = 'concatenate',
  'reverse' = 'reverse_digits',
}

export interface OpInfo {
  symbol: OpType; // Has to be an OpType
  value?: number;
  limit?: number;
}

export interface Puzzle {
  id: number;
  level: number;
  label: string; // ex: A1 for {level}{index + 1}
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

export const defaultPuzzle = (): Puzzle | null => null;
