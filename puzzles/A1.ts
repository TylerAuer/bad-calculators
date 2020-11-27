import { Puzzle } from '../app/src/structs/puzzle';

/**

PUZZLE A1

Adding and subtracting with simple min and equal goal.

*/

export const puzzle: Puzzle = {
  id: 0,
  level: 'A',
  label: 'A1',
  disabled: false,
  creator: 'Tyler',
  start: 0,
  target: 23,
  maxMoves: null,
  operations: [
    {
      symbol: 'add',
      value: 5,
    },
    {
      symbol: 'sub',
      value: 1,
    },
  ],
  blocks: [],
  stars: [
    {
      value: 1,
    },
    {
      value: 2,
      moves: 7,
      goalRelation: 'fewer',
    },
    {
      value: 3,
      moves: 13,
      goalRelation: 'exactly',
    },
  ],
};