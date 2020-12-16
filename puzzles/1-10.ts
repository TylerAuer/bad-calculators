import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 25,
  level: 1,
  indexInLevel: 10,
  disabled: false,
  creator: 'Tyler',
  start: 4,
  target: 11,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.sub,
      value: 1,
    },
    {
      symbol: OpType.mult,
      value: 11,
    },
    {
      symbol: OpType.div,
      value: 2,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 3,
      goalRelation: 'exactly',
    },
    {
      moves: 4,
      goalRelation: 'exactly',
    },
    {
      moves: 8,
      goalRelation: 'more',
    },
  ],
};
