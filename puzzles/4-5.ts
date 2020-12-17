import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 26,
  level: 4,
  indexInLevel: 5,
  disabled: false,
  creator: 'Tyler',
  start: 7,
  target: 1,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 2,
      limit: 2,
    },
    {
      symbol: OpType.collatz,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 16,
      goalRelation: 'fewer',
    },
    {
      moves: 12,
      goalRelation: 'fewer',
    },
    {
      moves: 8,
      goalRelation: 'fewer',
    },
  ],
};
