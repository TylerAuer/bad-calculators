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
      value: 1,
      moves: 20,
      goalRelation: 'fewer',
    },
    {
      value: 2,
      moves: 8,
      goalRelation: 'fewer',
    },
  ],
};
