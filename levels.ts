import { Level } from './app/src/structs/level';

export const levels: { [key: string]: Level } = {
  '1': {
    id: 1,
    puzzles: [0, 1, 2],
    levelBelow: 3,
    levelAbove: 2,
    desc:
      'Quick puzzles using arithmetic operations that introduce the structure of the puzzles.',
  },
};
