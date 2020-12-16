import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 23,
  level: 5,
  indexInLevel: 1,
  disabled: false,
  creator: 'Tyler',
  start: 1,
  target: 36,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.mult,
      value: 2,
    },
    {
      symbol: OpType.mult,
      value: 3,
    },
    {
      symbol: OpType.div,
      value: 6,
    },
  ],
  blocks: [12, 18],
  stars: [
    {
      moves: 7,
      goalRelation: 'exactly',
    },
    {
      moves: 10,
      goalRelation: 'exactly',
    },
  ],
};
