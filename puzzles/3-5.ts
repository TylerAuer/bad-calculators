import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 30,
  level: 3,
  indexInLevel: 5,
  disabled: false,
  creator: 'Tyler',
  start: 1,
  target: -343,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.mult,
      value: 7,
    },
    {
      symbol: OpType.div,
      value: -7,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 5,
      goalRelation: 'exactly',
    },
    {
      moves: 9,
      goalRelation: 'exactly',
    },
    {
      moves: 13,
      goalRelation: 'exactly',
    },
  ],
};
