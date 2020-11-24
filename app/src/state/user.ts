import { atom } from 'recoil';
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
