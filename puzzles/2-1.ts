import { OpType, Puzzle } from '../app/src/structs/puzzle';

/**
 *
 */

export const puzzle: Puzzle = {
  id: 3,
  level: 2,
  indexInLevel: 1,
  disabled: false,
  creator: 'Tyler',
  start: 1,
  target: 0.903,
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
      moves: 14,
      goalRelation: 'fewer',
    },
    {
      moves: 9,
      goalRelation: 'fewer',
    },
    {
      moves: 8,
      goalRelation: 'fewer',
    },
  ],
};
