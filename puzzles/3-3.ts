import { OpType, Puzzle } from '../app/src/structs/puzzle';

/**
 *
 */

export const puzzle: Puzzle = {
  id: 7,
  level: 3,
  indexInLevel: 3,
  disabled: false,
  creator: 'Tyler',
  start: 1,
  target: 0,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 13,
    },
    {
      symbol: OpType.sub,
      value: 7,
    },
    {
      symbol: OpType.div,
      value: -1,
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
      moves: 6,
      goalRelation: 'exactly',
    },
  ],
};
