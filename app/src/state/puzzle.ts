import { atom } from 'recoil';
import { Puzzle } from '../structs/puzzle';

// SHAPES //////////////////////////////////////////////////////////////////////

interface State {
  val: number;
  counts: number[];
}

// ATOMS ///////////////////////////////////////////////////////////////////////

export const puzzle = atom({
  key: 'puzzle',
  //default: defaultPuzzle(),
  default: null as Puzzle | null,
});

export const puzzleStates = atom({
  key: 'puzzleStates',
  default: [] as State[],
});

export const redoStates = atom({
  key: 'redoStates',
  default: [] as State[],
});

// SELECTORS ///////////////////////////////////////////////////////////////////
