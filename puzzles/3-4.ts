import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 8,
  level: 3,
  indexInLevel: 4,
  disabled: false,
  creator: 'Tyler',
  start: 1.11,
  target: 2.02,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 0.1,
    },
    {
      symbol: OpType.mult,
      value: -1,
    },
    {
      symbol: OpType.mult,
      value: 0.1,
    },
    {
      symbol: OpType.div,
      value: 0.1,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: Infinity,
    },
    {
      moves: 12,
      goalRelation: 'fewer',
    },
    {
      moves: 9,
      goalRelation: 'fewer',
    },
  ],
};
