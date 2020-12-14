import { atom, selector } from 'recoil';
import { Puzzle } from '../structs/puzzle';

// SHAPES //////////////////////////////////////////////////////////////////////

interface State {
  val: number;
  counts: number[];
  historyString: string;
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

export const totalStarsInAllPuzzles = selector({
  key: 'totalStarsInAllPuzzles',
  get: async () => {
    const response = await fetch('/stats');

    if (response.status >= 400) return null;

    const starCount = response.json();
    return starCount;
  },
});
