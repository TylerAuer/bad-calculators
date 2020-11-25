interface Progress {
  [key: string]: {
    // Unique puzzle id
    attempts?: number;
    stars: {
      [key: string]: boolean; // Key is the number of stars
    };
  };
}

interface User {
  pic?: string;
  first?: string;
  last?: string;
  authId?: string;
  progress: Progress;
}

export const defaultUserInfo = (): User => ({
  progress: {
    '0': {
      stars: {
        '1': true,
      },
    },
  },
});
