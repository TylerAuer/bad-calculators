// Index 0 refers to the first goal, index 1 to the second goal...etc.
export type PuzProgress = boolean[];

export enum SignInStatus {
  'OPTED_OUT', // User opted to not save progress
  'SIGNED_IN',
  'HAS_NOT_CHOSEN', // If a user is not found when checking
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
  progress: AllProgress;
}

export const defaultUserInfo = (): User => ({
  progress: {},
});
