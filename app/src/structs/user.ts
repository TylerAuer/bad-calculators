// Index 0 refers to the first goal, index 1 to the second goal...etc.
export type PuzProgress = (boolean | null)[];

export enum SignInStatus {
  'SIGNED_IN',
  'SIGNED_OUT',
  'CHECKING_FOR_SESSION', // When the app initially loads
}

export interface AllProgress {
  [key: string]: PuzProgress;
}

export interface User {
  id?: number;
  first?: string;
  last?: string;
  pic?: string;
  authId?: string;
  email?: string;
  progress?: AllProgress;
}

export interface ProgressUpdate {
  id: number;
  goalsMet: number[];
}

export interface ProgressMonitor {
  progress: AllProgress;
  open: boolean;
  title: string;
  message: string;
  history: string;
}
