export interface TrackSuccess {
  puzzleId: number;
  goals: number[];
}

export interface TrackAttempt {
  puzzleId: number;
}

export enum TrackAttemptStatus {
  'INACTIVE',
  'IN_PROGRESS',
}
