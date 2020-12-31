import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 17,
  level: 1,
  indexInLevel: 8,
  disabled: false,
  creator: 'Tyler',
  start: 1,
  target: 100,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 3,
    },
    {
      symbol: OpType.mult,
      value: 4,
    },
    {
      symbol: OpType.add,
      value: 5,
    },
    {
      symbol: OpType.mult,
      value: 6,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 6,
      goalRelation: 'exactly',
    },
    {
      moves: 7,
      goalRelation: 'exactly',
    },
    {
      moves: 8,
      goalRelation: 'exactly',
    },
    {
      moves: 9,
      goalRelation: 'exactly',
    },
    {
      moves: 16,
      goalRelation: 'exactly',
    },
  ],
};

export const givenSolutions = [
  [0, 0, 2, 0, 2, 0, 1, 0, 2],
  [2, 3, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
