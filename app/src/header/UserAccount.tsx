import { Suspense } from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import { isModalOpen } from '../state/ui';
import {isSignedIn, userInfo} from '../state/user';
import AccountModal from './AccountModal';

import './UserAccount.scss'

export default function UserAccount() {
  const setModal = useSetRecoilState(isModalOpen('Account'))
  const signedIn = useRecoilValue(isSignedIn)
  const user = useRecoilValue(userInfo)

  if (!signedIn) return null

  return (
    <>
      <Suspense fallback={''}>
        <AccountModal />
      </Suspense>
      <button className='user-account' onClick={() => setModal(true)}>
        <img 
          className='user-account__img' 
          alt={`${user.first}'s profile pic`} 
          src={user.pic} />
      </button>
    </>
  )
}