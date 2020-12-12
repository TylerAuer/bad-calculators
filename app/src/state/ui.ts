import { atom, atomFamily } from 'recoil';
import { RequestStatus } from '../structs/request';

export const isModalOpen = atomFamily({
  key: 'isModalOpen',
  default: false,
});

export const requestStatus = atomFamily({
  key: 'requestStatus',
  default: RequestStatus.INACTIVE,
});

export const puzzleIsLoading = atom({
  key: 'puzzleIsLoading',
  default: false,
});
