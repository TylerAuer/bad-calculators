import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 21,
  level: 2,
  indexInLevel: 6,
  disabled: false,
  creator: 'Tyler',
  start: 1,
  target: 555,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 1,
    },
    {
      symbol: OpType.mult,
      value: 10,
    },
    {
      symbol: OpType.div,
      value: 2,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 16,
      goalRelation: 'exactly',
    },
    {
      moves: 9,
      goalRelation: 'exactly',
    },
    {
      moves: 8,
      goalRelation: 'exactly',
    },
    {
      moves: 6,
      goalRelation: 'exactly',
    },
  ],
};
