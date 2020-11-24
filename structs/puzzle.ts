export interface Star {
  value: number; // How many pts it is worth
  moves?: number;
  goalRelation?: 'more' | 'fewer' | 'exactly';
}

export type Op =
  | 'add'
  | 'sub'
  | 'mult'
  | 'div'
  | 'pow'
  | 'mod'
  | 'fact'
  | 'root'
  | 'floor'
  | 'ceil'
  | 'base'
  | 'collatz'
  | 'recip'
  | 'abs'
  | 'concat';

export interface Button {
  symbol: Op;
  value?: number;
  limit?: number;
}

export interface Puzzle {
  id: string; // {LEVEL}_{ID} ex: A_1
  creator: string;
  desc?: string;
  start: number;
  goal: number;
  operations: Button[];
  stars: Star[];
  failCount?: number;
  successCount?: number;
}

export const defaultPuzzle = (): Puzzle | null => null;
