export interface TrackSuccess {
  puzzleId: number;
  goalsMet: number[];
}

export interface TrackAttempt {
  puzzleId: number;
}

export enum TrackAttemptStatus {
  'INACTIVE',
  'IN_PROGRESS',
}
