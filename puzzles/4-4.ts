import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 24,
  level: 4,
  indexInLevel: 4,
  disabled: false,
  creator: 'Tyler',
  start: 889,
  target: 100,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 1,
    },
    {
      symbol: OpType.reverse,
      limit: 2,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 4,
      goalRelation: 'exactly',
    },
    {
      moves: 5,
      goalRelation: 'exactly',
    },
  ],
};
