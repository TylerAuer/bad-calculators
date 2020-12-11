import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 20,
  level: 1,
  indexInLevel: 9,
  disabled: false,
  creator: 'Tyler',
  start: 1,
  target: 3,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.mult,
      value: 12,
    },
    {
      symbol: OpType.div,
      value: 2,
    },
    {
      symbol: OpType.div,
      value: 3,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 3,
      goalRelation: 'exactly',
    },
    {
      moves: 7,
      goalRelation: 'exactly',
    },
    {
      moves: 10,
      goalRelation: 'more',
    },
  ],
};
