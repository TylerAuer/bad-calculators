import { OpType, Puzzle } from '../app/src/structs/puzzle';

/**
 * Very easy puzzle with multiplication, addition, and subtraction
 */

export const puzzle: Puzzle = {
  id: 10,
  level: 1,
  indexInLevel: 4,
  disabled: false,
  creator: 'Tyler',
  start: 2,
  target: 13,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.sub,
      value: 1,
    },
    {
      symbol: OpType.mult,
      value: 2,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: Infinity,
    },
    {
      moves: 6,
      goalRelation: 'fewer',
    },
    {
      moves: 5,
      goalRelation: 'fewer',
    },
  ],
};
