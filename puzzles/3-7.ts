import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 32,
  level: 3,
  indexInLevel: 7,
  disabled: false,
  creator: 'Tyler',
  start: 2,
  target: 1024,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.mult,
      value: 2,
    },
    {
      symbol: OpType.expo_power,
      value: 2,
    },
    {
      symbol: OpType.expo_power,
      value: 3,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 3,
      goalRelation: 'exactly',
    },
    {
      moves: 4,
      goalRelation: 'exactly',
    },
    {
      moves: 5,
      goalRelation: 'exactly',
    },
    {
      moves: 7,
      goalRelation: 'exactly',
    },
    {
      moves: 9,
      goalRelation: 'exactly',
    },
  ],
};
