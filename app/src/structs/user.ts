interface Progress {
  [key: string]: {
    // Unique puzzle id {level}_{id}
    attempts: number;
    stars: {
      [key: number]: boolean; // Key is the number of stars
    };
  };
}

interface User {
  pic?: string;
  first?: string;
  last?: string;
  authId?: string;
  progress?: Progress;
}

export const defaultUserInfo = (): User | null => null;
