import { OpType, Puzzle } from '../app/src/structs/puzzle';

/**
 * Very easy puzzle with multiplication, addition, and subtraction
 */

export const puzzle: Puzzle = {
  id: 2,
  level: 1,
  indexInLevel: 3,
  disabled: false,
  creator: 'Tyler',
  start: 9,
  target: 3,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.mult,
      value: 0,
    },
    {
      symbol: OpType.add,
      value: 1,
    },
    {
      symbol: OpType.sub,
      value: 2,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: Infinity,
    },
    {
      moves: 3,
      goalRelation: 'exactly',
    },
    {
      moves: 4,
      goalRelation: 'exactly',
    },
  ],
};
