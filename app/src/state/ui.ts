import { atom } from 'recoil';

export const isSuccessModalOpen = atom({
  key: 'isSuccessModalOpen',
  default: false,
});

export const puzzleIsLoading = atom({
  key: 'puzzleIsLoading',
  default: false,
});
