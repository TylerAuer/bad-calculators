import { atom } from 'recoil';
import { defaultIsSignedIn, defaultUserInfo } from '../../../structs/user';

export const isSignedIn = atom({
  key: 'isSignedIn',
  default: defaultIsSignedIn(),
});

export const userInfo = atom({
  key: 'userInfo',
  default: defaultUserInfo(),
});
