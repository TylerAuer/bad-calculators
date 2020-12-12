import { RequestStatus } from '../structs/request';
import { SignInStatus } from '../structs/user';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { signInState, userInfo } from '../state/user';
import { requestStatus } from '../state/ui';
import { useLocation, useHistory } from 'react-router-dom';

export default function UserSignInMonitor() {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [reqStatus, setReqStatus] = useRecoilState(requestStatus('user/data'));
  const setUser = useSetRecoilState(userInfo);
  const location = useLocation();
  const history = useHistory();

  // Redirect based on sign in status
  useEffect(() => {
    // User hasn't opted whether to sign in so redirect to '/'
    if (signIn === SignInStatus.HAS_NOT_CHOSEN) {
      history.push('/');
    }

    // User is signed in so, move to level page
    if (signIn === SignInStatus.SIGNED_IN && location.pathname === '/') {
      history.push('/level/1');
    }
  });

  useEffect(() => {
    if (reqStatus === RequestStatus.IN_PROGRESS) return;
    if (signIn !== SignInStatus.HAS_NOT_CHOSEN) return;

    checkForUser();

    async function checkForUser() {
      setReqStatus(RequestStatus.IN_PROGRESS);

      const res = await fetch('/user/data');

      if (res.status >= 400) setReqStatus(RequestStatus.FAILED);

      const user = await res.json();
      setUser(user);
      setReqStatus(RequestStatus.INACTIVE);
      setSignIn(SignInStatus.SIGNED_IN);
    }
  }, [signIn, setSignIn, setUser, reqStatus, setReqStatus]);

  return null;
}
