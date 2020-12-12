import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 18,
  level: 4,
  indexInLevel: 2,
  disabled: false,
  creator: 'Tyler',
  start: 12,
  target: 90,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 3,
    },
    {
      symbol: OpType.reverse,
      limit: 2,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: Infinity,
    },
    {
      moves: 10,
      goalRelation: 'exactly',
    },
    {
      moves: 6,
      goalRelation: 'fewer',
    },
  ],
};
