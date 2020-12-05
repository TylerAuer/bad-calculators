import { atom, atomFamily } from 'recoil';

export const isModalOpen = atomFamily({
  key: 'isModalOpen',
  default: false,
});

export const puzzleIsLoading = atom({
  key: 'puzzleIsLoading',
  default: false,
});
