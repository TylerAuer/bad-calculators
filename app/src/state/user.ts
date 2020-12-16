import { atom, selector } from 'recoil';
import { User, SignInStatus, AllProgress } from '../structs/user';

// ATOMS ///////////////////////////////////////////////////////////////////////

export const signInState = atom({
  key: 'signInState',
  default: SignInStatus.CHECKING_FOR_SESSION,
});

export const userInfo = atom({
  key: 'userInfo',
  default: {} as User,
});

export const progress = atom({
  key: 'progress',
  default: {} as AllProgress,
});

// SELECTORS ///////////////////////////////////////////////////////////////////

export const starCount = selector({
  key: 'starCount',
  get: ({ get }) => {
    const prog = get(progress);
    let stars = 0;

    Object.values(prog).forEach((progressArray) => {
      // count TRUEs in each puzzles progress arr
      stars += progressArray.filter((i) => !!i).length;
    });

    return stars;
  },
});
