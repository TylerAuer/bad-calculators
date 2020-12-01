import { atom, selector } from 'recoil';
import { defaultUserInfo } from '../structs/user';

// ATOMS ///////////////////////////////////////////////////////////////////////

export const isSignedIn = atom({
  key: 'isSignedIn',
  default: false,
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
