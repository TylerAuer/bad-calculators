import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 22,
  level: 2,
  indexInLevel: 7,
  disabled: false,
  creator: 'Tyler',
  start: 333,
  target: 1,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.sub,
      value: 1,
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
      moves: 7,
      goalRelation: 'exactly',
    },
    {
      moves: 8,
      goalRelation: 'exactly',
    },
    {
      moves: 9,
      goalRelation: 'exactly',
    },
    {
      moves: 9,
      goalRelation: 'more',
    },
  ],
};
