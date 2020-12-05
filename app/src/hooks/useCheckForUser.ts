import { useSetRecoilState, useRecoilState } from 'recoil';
import { isSignedIn, userInfo } from '../state/user';

export default function useCheckForUser() {
  const [signedIn, setSignedIn] = useRecoilState(isSignedIn);
  const setUser = useSetRecoilState(userInfo);

  const checkForUser = async () => {
    // If user is already signed in, don't make a network request
    if (signedIn) return;

    const res = await fetch('/user/data');

    if (res.status >= 400) {
      // User is not signed in, the default progress data is good
      setSignedIn(false);
      return;
    } else {
      const user = await res.json();

      setUser(user);
      setSignedIn(true);
    }
  };

  return checkForUser;
}
