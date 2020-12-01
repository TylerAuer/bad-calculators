import { Level } from '../app/src/structs/level';

export const levels: { [key: string]: Level } = {
  '1': {
    id: 1,
    levelBelow: null,
    levelAbove: 2,
    puzIndexes: [],
    desc: 'Quick puzzles using arithmetic operations and whole numbers.',
  },
  '2': {
    id: 2,
    levelBelow: 1,
    levelAbove: null,
    puzIndexes: [],
    desc: 'Trickier puzzles with decimals and the arithmetic operations.',
  },
  '3': {
    id: 3,
    levelBelow: 2,
    levelAbove: null,
    puzIndexes: [],
    desc:
      'Level 3 puzzle introduce blocks -- numbers you must avoid as you find your way to the target',
  },
  '4': {
    id: 4,
    levelBelow: 3,
    levelAbove: null,
    puzIndexes: [],
    desc: 'Level 4 puzzles add new operations.',
  },
};
