import { Level } from './app/src/structs/level';

export const levels: { [key: string]: Level } = {
  '1': {
    id: 1,
    puzzles: [0, 1, 2],
    levelBelow: null,
    levelAbove: null,
    desc:
      'Quick puzzles using arithmetic operations that introduce the structure of the puzzles.',
  },
};
