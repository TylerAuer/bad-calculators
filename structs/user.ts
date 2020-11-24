// USER AND ACCOUNT TYPES SHARED BETWEEN FRONT AND BACKENDS

// A map of a user's progress where the key a puzzles unique id
interface Progress {
  [key: number]: {
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

export const defaultIsSignedIn = (): boolean => false;
export const defaultUserInfo = (): User | null => null;
