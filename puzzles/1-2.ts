import { OpType, Puzzle } from '../app/src/structs/puzzle';

/**
 * Very easy puzzle with addition and subtraction
 */

export const puzzle: Puzzle = {
  id: 1,
  level: 1,
  indexInLevel: 2,
  disabled: false,
  creator: 'Tyler',
  start: 20,
  target: 19,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 5,
    },
    {
      symbol: OpType.add,
      value: 3,
    },
    {
      symbol: OpType.sub,
      value: 16,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: Infinity,
    },
    {
      moves: 4,
      goalRelation: 'fewer',
    },
    {
      moves: 6,
      goalRelation: 'exactly',
    },
  ],
};
