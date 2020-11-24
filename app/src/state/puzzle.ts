import { atom } from 'recoil';
import { defaultPuzzle } from '../structs/puzzle';

// ATOMS ///////////////////////////////////////////////////////////////////////

export const puzzle = atom({
  key: 'puzzle',
  default: defaultPuzzle(),
});

export const moveHistory = atom({
  key: 'moveHistory',
  default: [] as number[],
});

export const moveFuture = atom({
  key: 'moveFuture',
  default: [] as number[],
});

export const screenVal = atom({
  key: 'screenVal',
  default: 0,
});

// SELECTORS ///////////////////////////////////////////////////////////////////
