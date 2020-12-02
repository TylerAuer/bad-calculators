import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 5,
  level: 3,
  indexInLevel: 1,
  disabled: false,
  creator: 'Tyler',
  start: 8,
  target: 18,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 3,
    },
    {
      symbol: OpType.sub,
      value: 7,
    },
    {
      symbol: OpType.mult,
      value: -1,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: Infinity,
    },
    {
      moves: 4,
      goalRelation: 'exactly',
    },
    {
      moves: 6,
      goalRelation: 'exactly',
    },
  ],
};
