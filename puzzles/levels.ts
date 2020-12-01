import { Level } from '../app/src/structs/level';

export const levels: { [key: string]: Level } = {
  '1': {
    id: 1,
    levelBelow: null,
    levelAbove: 2,
    puzIndexes: [],
    desc:
      'Quick puzzles using arithmetic operations that introduce the structure of the puzzles.',
  },
  '2': {
    id: 2,
    levelBelow: 1,
    levelAbove: null,
    puzIndexes: [],
    desc:
      'A step up from level 1. These puzzles tend to take a little more thought and exploration.',
  },
};
