import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 29,
  level: 4,
  indexInLevel: 6,
  disabled: false,
  creator: 'Tyler',
  start: 10,
  target: 102,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.base,
      value: 3,
    },
    {
      symbol: OpType.base,
      value: 6,
    },
    {
      symbol: OpType.base,
      value: 7,
    },
    {
      symbol: OpType.base,
      value: 20,
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
  ],
};
