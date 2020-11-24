import { atom } from 'recoil';
import { defaultPuzzle } from '../../../structs/puzzle';

// ATOMS ///////////////////////////////////////////////////////////////////////

export const puzzle = atom({
  key: 'puzzle',
  default: defaultPuzzle(),
});

export const puzzleHistory = atom({
  key: 'puzzleHistory',
  default: [] as number[],
});

export const puzzleFuture = atom({
  key: 'puzzleFuture',
  default: [] as number[],
});

// SELECTORS ///////////////////////////////////////////////////////////////////
