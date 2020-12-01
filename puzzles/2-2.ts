import { OpType, Puzzle } from '../app/src/structs/puzzle';

/**
 *
 */

export const puzzle: Puzzle = {
  id: 4,
  level: 2,
  indexInLevel: 2,
  disabled: false,
  creator: 'Tyler',
  start: 1,
  target: 0.919,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 0.1,
    },
    {
      symbol: OpType.sub,
      value: 0.1,
    },
    {
      symbol: OpType.mult,
      value: 10,
    },
    {
      symbol: OpType.div,
      value: 10,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: Infinity,
    },
    {
      moves: 20,
      goalRelation: 'fewer',
    },
    {
      moves: 8,
      goalRelation: 'fewer',
    },
  ],
};
