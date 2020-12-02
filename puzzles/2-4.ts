import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 12,
  level: 2,
  indexInLevel: 4,
  disabled: false,
  creator: 'Tyler',
  start: 1,
  target: 0.275,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 0.1,
    },
    {
      symbol: OpType.div,
      value: 2,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: Infinity,
    },
    {
      moves: 5,
      goalRelation: 'exactly',
    },
    {
      moves: 3,
      goalRelation: 'exactly',
    },
  ],
};
