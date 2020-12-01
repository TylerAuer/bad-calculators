// Index 0 refers to the first goal, index 1 to the second goal...etc.
export type PuzProgress = boolean[];

interface AllProgress {
  [key: string]: PuzProgress;
}

interface User {
  pic?: string;
  first?: string;
  last?: string;
  authId?: string;
  progress: AllProgress;
}

export const defaultUserInfo = (): User => ({
  progress: {},
});
