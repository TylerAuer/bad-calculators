import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 13,
  level: 1,
  indexInLevel: 5,
  disabled: false,
  creator: 'Tyler',
  start: 64,
  target: 1,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 1,
    },
    {
      symbol: OpType.div,
      value: 2,
    },
    {
      symbol: OpType.div,
      value: 17,
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
      moves: 5,
      goalRelation: 'exactly',
    },
  ],
};
