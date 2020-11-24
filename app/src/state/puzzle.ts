import { atom } from 'recoil';
import { defaultPuzzle } from '../../../structs/puzzle';

export const fixedPuzzleData = atom({
  key: 'fixedPuzzleData',
  default: defaultPuzzle(),
});
