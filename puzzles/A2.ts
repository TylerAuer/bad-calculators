import { Puzzle } from '../app/src/structs/puzzle';

/**

PUZZLE A2

Add 3s or 5s to get the target values

*/

export const puzzle: Puzzle = {
  id: 1,
  level: 'A',
  label: 'A2',
  disabled: false,
  creator: 'Tyler',
  start: 20,
  target: 19,
  maxMoves: null,
  operations: [
    {
      symbol: 'add',
      value: 5,
    },
    {
      symbol: 'add',
      value: 3,
    },
    {
      symbol: 'sub',
      value: 16,
    },
  ],
  blocks: [],
  stars: [
    {
      value: 1,
    },
    {
      value: 2,
      moves: 4,
      goalRelation: 'fewer',
    },
    {
      value: 3,
      moves: 6,
      goalRelation: 'exactly',
    },
  ],
};
