export interface PuzProgress {
  stars: {
    [key: string]: boolean; // Key is the number of stars
  };
}

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
