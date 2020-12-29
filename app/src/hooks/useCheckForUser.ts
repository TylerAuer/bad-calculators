import { RequestStatus } from '../structs/request';
import { SignInStatus } from '../structs/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { progress, signInState, userInfo } from '../state/user';
import { requestStatus } from '../state/ui';
import mergeProgress from '../functions/mergeProgress';

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
    setUser(user); // Load user info into state
    setProg(user.progress);

    /**
     * When a user has local progress when they sign in, prompt to
     * see if they want to save their local progress to their account.
     *
     * This is occurs when a user solves puzzles while opting out of sign in
     * then decides to sign in or make an account.
     */
    const localProgress = JSON.parse(
      window.localStorage.getItem('progress') || '{}'
    );
    const localPuzzlesWithEarnedStars = Object.keys(localProgress).length;

    const hasProgressInLocalStorage = localPuzzlesWithEarnedStars > 0;

    if (hasProgressInLocalStorage) {
      const confirm = window.confirm(
        `It looks like you solved ${localPuzzlesWithEarnedStars} puzzle${
          localPuzzlesWithEarnedStars > 1 ? 's' : '' // make plural if needed
        } before signing in. Do you want to save that progress to your account?`
      );

      if (confirm) {
        setProg(mergeProgress(localProgress, user.progress));
      }
    }

    window.localStorage.removeItem('progress');
  }
}
