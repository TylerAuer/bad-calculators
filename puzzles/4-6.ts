import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 27,
  level: 4,
  indexInLevel: 6,
  disabled: false,
  creator: 'Tyler',
  start: 190,
  target: 3,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 1,
    },
    {
      symbol: OpType.reverse,
    },
  ],
  blocks: [29],
  stars: [
    {
      moves: 5,
      goalRelation: 'exactly',
    },
  ],
};
