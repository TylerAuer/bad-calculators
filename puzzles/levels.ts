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
    levelAbove: 3,
    puzIndexes: [],
    desc: 'Level 2 puzzles are trickier and include decimals.',
  },
  '3': {
    id: 3,
    levelBelow: 2,
    levelAbove: 4,
    puzIndexes: [],
    desc:
      'Level 3 puzzles introduce negative numbers and a few new operations.',
  },
  '4': {
    id: 4,
    levelBelow: 3,
    levelAbove: null,
    puzIndexes: [],
    desc:
      'Level 4 puzzle introduce blocks -- numbers you must avoid as you find your way to the target.',
  },
};
