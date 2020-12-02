import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 6,
  level: 3,
  indexInLevel: 2,
  disabled: false,
  creator: 'Tyler',
  start: 2,
  target: 8,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.sub,
      value: 3,
    },
    {
      symbol: OpType.mult,
      value: -2,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 2,
      goalRelation: 'exactly',
    },
    {
      moves: 3,
      goalRelation: 'exactly',
    },
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
