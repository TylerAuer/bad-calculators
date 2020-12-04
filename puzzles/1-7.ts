import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 16,
  level: 1,
  indexInLevel: 7,
  disabled: false,
  creator: 'Tyler',
  start: 1,
  target: 81,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 3,
    },
    {
      symbol: OpType.mult,
      value: 3,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 4,
      goalRelation: 'exactly',
    },
    {
      moves: 5,
      goalRelation: 'exactly',
    },
    {
      moves: 6,
      goalRelation: 'exactly',
    },
    {
      moves: 11,
      goalRelation: 'exactly',
    },
    {
      moves: 12,
      goalRelation: 'exactly',
    },
  ],
};
