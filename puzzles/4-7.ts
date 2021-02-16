import { OpType, Puzzle } from '../app/src/structs/puzzle';

export const puzzle: Puzzle = {
  id: 33,
  level: 4,
  indexInLevel: 7,
  disabled: false,
  creator: 'Tyler',
  start: 3,
  target: 25,
  maxMoves: null,
  operations: [
    {
      symbol: OpType.add,
      value: 3,
    },
    {
      symbol: OpType.look_and_say,
      limit: 2,
    },
  ],
  blocks: [],
  stars: [
    {
      moves: 5,
      goalRelation: 'exactly',
    },
    {
      moves: 6,
      goalRelation: 'exactly',
    },
    {
      moves: 6,
      goalRelation: 'more',
    },
  ],
};

export const givenSolutions = [
  [...new Array(36).fill(0), 1, ...new Array(8).fill(0), 1],
];
