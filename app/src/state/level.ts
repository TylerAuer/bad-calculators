import { atom, selector } from 'recoil';
import { Level } from '../structs/level';

// SHAPES //////////////////////////////////////////////////////////////////////

// ATOMS ///////////////////////////////////////////////////////////////////////

export const levelId = atom({
  key: 'levelId',
  default: 1,
});

// SELECTORS ///////////////////////////////////////////////////////////////////

/**
 * Loads level data from the API based on the levelID
 */
export const levelData = selector({
  key: 'levelData',
  get: async ({ get }) => {
    const res = await fetch(`/level/${get(levelId)}`);

    return (await res.json()) as Level;
  },
});
