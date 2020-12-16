import { SignInStatus } from '../structs/user';
import { useRecoilValue } from 'recoil';
import { signInState } from '../state/user';
import { useLocation, useHistory } from 'react-router-dom';
import useCheckForUser from '../hooks/useCheckForUser';

export default function UserSignInMonitor() {
  const signIn = useRecoilValue(signInState);
  const location = useLocation();
  const history = useHistory();

  // When site loads for the first time, check to see if the user has an active
  // account + session
  useCheckForUser();

  // Once the initial check is complete, redirect if needed
  if (signIn !== SignInStatus.CHECKING_FOR_SESSION) {
    // User hasn't selected whether to log in or not, so redirect to '/' so
    // that they can choose
    if (signIn === SignInStatus.SIGNED_OUT && location.pathname !== '/') {
      history.push('/');
    }

    // User is already signed in, so no need to show them '/'
    if (signIn === SignInStatus.SIGNED_IN && location.pathname === '/') {
      history.push('/level/1');
    }
  }

  return null;
}
