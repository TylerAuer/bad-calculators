import { atom } from 'recoil';
import { TrackAttemptStatus } from '../structs/track';

export const attemptStatus = atom({
  key: 'attemptsStatus',
  default: TrackAttemptStatus.INACTIVE,
});

export const hasLoggedSuccessAndSaved = atom({
  key: 'hasLoggedSuccessAndSaved',
  default: false,
});
