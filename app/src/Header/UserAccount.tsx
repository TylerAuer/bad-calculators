import { SignInStatus } from '../structs/user';
import { Suspense } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isModalOpen } from '../state/ui';
import { signInState, userInfo } from '../state/user';
import AccountModal from './AccountModal';

import './UserAccount.scss';

export default function UserAccount() {
  const setModal = useSetRecoilState(isModalOpen('Account'));
  const signedIn = useRecoilValue(signInState);
  const user = useRecoilValue(userInfo);

  if (signedIn === SignInStatus.OPTED_OUT) {
    return (
      <a className="opted-out__btn" href="/auth/google">
        Sign In
      </a>
    );
  } else if (signedIn === SignInStatus.SIGNED_IN) {
    return (
      <>
        <Suspense fallback={''}>
          <AccountModal />
        </Suspense>
        <button className="signed-in__btn" onClick={() => setModal(true)}>
          <img
            className="signed-in__img"
            alt={`${user.first}'s profile pic`}
            src={user.pic}
          />
        </button>
      </>
    );
  } else {
    return null;
  }
}
