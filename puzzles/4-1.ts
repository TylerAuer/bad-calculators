import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 15,
  level: 4,
  indexInLevel: 1,
  disabled: false,
  creator: 'Tyler',
  start: 20,
  target: 7,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 3,
    },
    {
      symbol: OpType.mod,
      value: 5,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: Infinity,
    },
    {
      moves: 6,
      goalRelation: 'exactly',
    },
    {
      moves: 5,
      goalRelation: 'fewer',
    },
  ],
};
