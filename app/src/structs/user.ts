// Index 0 refers to the first goal, index 1 to the second goal...etc.
export type PuzProgress = boolean[];

interface AllProgress {
  [key: string]: PuzProgress;
}

export interface User {
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
