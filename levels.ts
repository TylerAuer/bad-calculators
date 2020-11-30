import { Level } from './app/src/structs/level';

export const levels: { [key: string]: Level } = {
  '1': {
    id: 1,
    levelBelow: null,
    levelAbove: null,
    puzIndexes: [],
    desc:
      'Quick puzzles using arithmetic operations that introduce the structure of the puzzles.',
  },
};
