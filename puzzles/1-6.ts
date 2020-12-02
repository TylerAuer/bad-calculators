import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 14,
  level: 1,
  indexInLevel: 6,
  disabled: false,
  creator: 'Tyler',
  start: 9,
  target: 10008,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 9,
    },
    {
      symbol: OpType.mult,
      value: 10,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 7,
      goalRelation: 'fewer',
    },
    {
      moves: 7,
      goalRelation: 'more',
    },
  ],
};
