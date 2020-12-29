import { SignInStatus } from '../structs/user';
import { useRecoilValue } from 'recoil';
import { signInState } from '../state/user';
import { useHistory } from 'react-router-dom';
import useCheckForUser from '../hooks/useCheckForUser';

export default function UserSignInMonitor() {
  const signIn = useRecoilValue(signInState);
  const history = useHistory();
  const { location } = history;

  // When site loads for the first time, check to see if the user has an active
  // account + session
  useCheckForUser();

  // Redirect if needed
  switch (signIn) {
    case SignInStatus.CHECKING_FOR_SESSION:
      break;
    case SignInStatus.NO_SESSION_OR_ACCOUNT_FOUND:
      if (location.pathname !== '/') history.push('/');
      break;
    case SignInStatus.SIGNED_IN:
    case SignInStatus.OPTED_OUT:
      if (location.pathname === '/') history.push('/level/1');
  }

  return null;
}
