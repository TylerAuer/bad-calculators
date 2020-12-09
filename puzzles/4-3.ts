import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 19,
  level: 4,
  indexInLevel: 3,
  disabled: false,
  creator: 'Tyler',
  start: 11,
  target: 2,
  maxMoves: 7,
  operations: [
    {
      symbol: OpType.add,
      value: 5,
    },
    {
      symbol: OpType.mult,
      value: 2,
    },
    {
      symbol: OpType.mod,
      value: 3,
      limit: 1,
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
      moves: 5,
      goalRelation: 'exactly',
    },
    {
      moves: 6,
      goalRelation: 'exactly',
    },
    {
      moves: 7,
      goalRelation: 'exactly',
    },
  ],
};
