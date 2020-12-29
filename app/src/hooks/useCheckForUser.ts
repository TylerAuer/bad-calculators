import { RequestStatus } from '../structs/request';
import { SignInStatus } from '../structs/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { progress, signInState, userInfo } from '../state/user';
import { requestStatus } from '../state/ui';

export default async function useCheckForUser() {
  const [reqStatus, setReqStatus] = useRecoilState(requestStatus('user/data'));
  const [signIn, setSignIn] = useRecoilState(signInState);
  const setUser = useSetRecoilState(userInfo);
  const setProg = useSetRecoilState(progress);

  // Don't check for user if already checking
  // or if already checked previously
  if (
    reqStatus === RequestStatus.IN_PROGRESS ||
    signIn !== SignInStatus.CHECKING_FOR_SESSION
  ) {
    return;
  }

  // Check server for active session and account
  setReqStatus(RequestStatus.IN_PROGRESS);
  const res = await fetch('/user/data');

  if (res.status >= 400) {
    setSignIn(SignInStatus.NO_SESSION_OR_ACCOUNT_FOUND);

    if (res.status === 401) {
      // User is not signed in
      setReqStatus(RequestStatus.INACTIVE);
    } else {
      setReqStatus(RequestStatus.FAILED);
    }

    // Load progress from local storage
    const prog = JSON.parse(window.localStorage.getItem('progress') || '{}');
    setProg(prog);
  } else {
    // User found
    const user = await res.json();
    setSignIn(SignInStatus.SIGNED_IN);
    setReqStatus(RequestStatus.INACTIVE);
    setUser(user);
    setProg(user.progress);
  }
}
