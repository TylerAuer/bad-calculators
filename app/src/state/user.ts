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

    Object.values(progress).forEach((puz) => {
      Object.entries(puz.stars).forEach(([val, earned]) => {
        if (earned) {
          console.log(earned, val);
          stars += parseInt(val, 10);
        }
      });
    });

    return stars;
  },
});
