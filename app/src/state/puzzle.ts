import { atom } from 'recoil';
import { Puzzle } from '../structs/puzzle';
// import { defaultPuzzle } from '../structs/puzzle';

// TESTING PUZZLE //////////////////////////////////////////////////////////////
const testPuz: Puzzle = {
  id: 'A_1',
  creator: 'Tyler',
  desc: 'Introductory question to demonstrate how the application works.',
  start: 0,
  goal: 23,
  operations: [
    {
      symbol: 'add',
      value: 5,
    },
    {
      symbol: 'sub',
      value: 1,
    },
  ],
  stars: [
    {
      value: 1,
    },
    {
      value: 2,
      moves: 13,
      goalRelation: 'fewer',
    },
    {
      value: 3,
      moves: 7,
      goalRelation: 'fewer',
    },
  ],
};

const defaultPuzState = [
  {
    val: testPuz.start,
    limits: testPuz.operations.map((o) => o.limit || Infinity),
  },
];

// SHAPES //////////////////////////////////////////////////////////////////////

interface State {
  val: number;
  limits: number[];
}

// ATOMS ///////////////////////////////////////////////////////////////////////

export const puzzle = atom({
  key: 'puzzle',
  //default: defaultPuzzle(),
  default: testPuz,
});

export const puzzleStates = atom({
  key: 'puzzleStates',
  default: defaultPuzState as State[],
});

export const redoStates = atom({
  key: 'redoStates',
  default: [] as State[],
});

// SELECTORS ///////////////////////////////////////////////////////////////////
