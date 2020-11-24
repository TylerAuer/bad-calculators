export interface Star {
  value: number; // How many pts it is worth
  moves?: number;
  goalRelation?: 'more' | 'fewer' | 'exactly';
}

export enum OpType {
  'add' = 'add',
  'sub' = 'sub',
  'mult' = 'mult',
  'div' = 'div',
  'pow' = 'pow',
  'mod' = 'mod',
  'fact' = 'fact',
  'root' = 'root',
  'floor' = 'floor',
  'ceil' = 'ceil',
  'base' = 'base',
  'collatz' = 'collatz',
  'recip' = 'recip',
  'abs' = 'abs',
  'concat' = 'concat',
}

export interface OpInfo {
  symbol: string; // Has to be an OpType
  value?: number;
  limit?: number;
}

export interface Puzzle {
  id: string; // {LEVEL}_{ID} ex: A_1
  creator: string;
  desc?: string;
  start: number;
  goal: number;
  operations: OpInfo[];
  stars: Star[];
  failCount?: number;
  successCount?: number;
}

export const defaultPuzzle = (): Puzzle | null => null;
