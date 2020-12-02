import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 9,
  level: 2,
  indexInLevel: 3,
  disabled: false,
  creator: 'Tyler',
  start: 1.11,
  target: 2.35,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 0.1,
    },
    {
      symbol: OpType.sub,
      value: 0.1,
    },
    {
      symbol: OpType.mult,
      value: 2,
    },
    {
      symbol: OpType.mult,
      value: 10,
    },
    {
      symbol: OpType.div,
      value: 10,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 12,
      goalRelation: 'fewer',
    },
    {
      moves: 8,
      goalRelation: 'fewer',
    },
    {
      moves: 6,
      goalRelation: 'fewer',
    },
  ],
};
