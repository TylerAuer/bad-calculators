import { atom, selector } from 'recoil';
import { defaultUserInfo, SignInStatus } from '../structs/user';

// ATOMS ///////////////////////////////////////////////////////////////////////

export const signInState = atom({
  key: 'signInState',
  default: SignInStatus.HAS_NOT_CHOSEN,
});

export const userInfo = atom({
  key: 'userInfo',
  default: defaultUserInfo(),
});

// SELECTORS ///////////////////////////////////////////////////////////////////

export const starCount = selector({
  key: 'starCount',
  get: ({ get }) => {
    const { progress } = get(userInfo);
    let stars = 0;

    Object.values(progress).forEach((progressArray) => {
      // count TRUEs in each puzzles progress arr
      stars += progressArray.filter((i) => !!i).length;
    });

    return stars;
  },
});
