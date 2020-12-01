import { OpType, Puzzle } from '../app/src/structs/puzzle';

/**
 * Very easy puzzle with addition and subtraction
 */

export const puzzle: Puzzle = {
  id: 0,
  level: 1,
  indexInLevel: 1,
  disabled: false,
  creator: 'Tyler',
  start: 0,
  target: 23,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 5,
    },
    {
      symbol: OpType.sub,
      value: 1,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: Infinity,
    },
    {
      moves: 7,
      goalRelation: 'fewer',
    },
    {
      moves: 13,
      goalRelation: 'exactly',
    },
  ],
};
