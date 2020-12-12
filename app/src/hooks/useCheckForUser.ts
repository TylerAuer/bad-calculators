import { SignInStatus } from '../structs/user';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { signInState, userInfo } from '../state/user';

export default function useCheckForUser() {
  const [signedIn, setSignedIn] = useRecoilState(signInState);
  const setUser = useSetRecoilState(userInfo);

  const checkForUser = async () => {
    // If user is already signed in, don't make a network request
    if (signedIn === SignInStatus.SIGNED_IN) return;

    // If the user has opted out, don't make a network request
    if (signedIn === SignInStatus.OPTED_OUT) return;

    const res = await fetch('/user/data');

    if (res.status < 400) {
      const user = await res.json();

      setUser(user);
      setSignedIn(SignInStatus.SIGNED_IN);
    }
  };

  return checkForUser;
}
