import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 31,
  level: 3,
  indexInLevel: 6,
  disabled: false,
  creator: 'Tyler',
  start: 1,
  target: 200,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 0.1,
    },
    {
      symbol: OpType.sub,
      value: 10,
    },
    {
      symbol: OpType.mult,
      value: -10,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 3,
      goalRelation: 'exactly',
    },
    {
      moves: 5,
      goalRelation: 'exactly',
    },
    {
      moves: 7,
      goalRelation: 'exactly',
    },
    {
      moves: 9,
      goalRelation: 'exactly',
    },
  ],
};
