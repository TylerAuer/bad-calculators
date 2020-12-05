import {useRecoilValue} from 'recoil';
import {isSignedIn, userInfo} from '../state/user';

import './UserAccount.scss'

export default function UserAccount() {
  const signedIn = useRecoilValue(isSignedIn)
  const user = useRecoilValue(userInfo)

  if (!signedIn) return null

  return (
    <button className='user-account'>
      <img className='user-account__img'alt={`${user.first}'s profile pic`} src={user.pic}/>
    </button>
  )
}