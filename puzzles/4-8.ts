import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 34,
  level: 4,
  indexInLevel: 8,
  disabled: false,
  creator: 'Tyler',
  start: 2,
  target: 10,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.sub,
      value: 100,
    },
    {
      symbol: OpType.div,
      value: 10,
    },
    {
      symbol: OpType.expo_base,
      value: 10,
      limit: 3,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 2,
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
  ],
};

export const givenSolutions = [];
