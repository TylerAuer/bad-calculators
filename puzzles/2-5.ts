import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 11,
  level: 2,
  indexInLevel: 5,
  disabled: false,
  creator: 'Tyler',
  start: 1,
  target: 1.1111,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 0.1,
    },
    {
      symbol: OpType.add,
      value: 0.91,
    },
    {
      symbol: OpType.div,
      value: 10,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 8,
      goalRelation: 'exactly',
    },
    {
      moves: 7,
      goalRelation: 'fewer',
    },
    {
      moves: 6,
      goalRelation: 'fewer',
    },
  ],
};
