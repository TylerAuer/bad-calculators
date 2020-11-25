import { atom } from 'recoil';
import { Puzzle } from '../structs/puzzle';
// import { defaultPuzzle } from '../structs/puzzle';

// TESTING PUZZLE //////////////////////////////////////////////////////////////
const testPuz: Puzzle = {
  uniqueId: 0,
  label: 'A1',
  disabled: false,
  creator: 'Tyler',
  desc: 'Adding and subtracting with simple min and equal goal.',
  start: 0,
  target: 23,
  maxMoves: null,
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
  blocks: [],
  stars: [
    {
      value: 1,
    },
    {
      value: 2,
      moves: 7,
      goalRelation: 'fewer',
    },
    {
      value: 3,
      moves: 13,
      goalRelation: 'exactly',
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
