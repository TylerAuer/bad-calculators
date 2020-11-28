import { OpType, Puzzle } from '../app/src/structs/puzzle';

/**

PUZZLE A3

Multiplying by zero is needed to hit the third goal

*/

export const puzzle: Puzzle = {
  id: 2,
  level: 'A',
  label: 'A3',
  disabled: false,
  creator: 'Tyler',
  start: 9,
  target: 3,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.mult,
      value: 0,
    },
    {
      symbol: OpType.add,
      value: 1,
    },
    {
      symbol: OpType.sub,
      value: 2,
    },
  ],
  blocks: [],
  stars: [
    {
      value: 1,
    },
    {
      value: 2,
      moves: 3,
      goalRelation: 'exactly',
    },
    {
      value: 3,
      moves: 4,
      goalRelation: 'exactly',
    },
  ],
};
