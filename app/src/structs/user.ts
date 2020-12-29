// Index 0 refers to the first goal, index 1 to the second goal...etc.
export type PuzProgress = (boolean | null)[];

export enum SignInStatus {
  // When the app initially loads and awaiting response from backend if user has
  // session and an account
  'CHECKING_FOR_SESSION',
  // After checking the server, no session or account is found
  'NO_SESSION_OR_ACCOUNT_FOUND',
  // Found users info and signed in
  'SIGNED_IN',
  // Only storing progress locally
  'OPTED_OUT',
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
