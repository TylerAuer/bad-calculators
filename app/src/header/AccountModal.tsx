import {useHistory} from 'react-router-dom';
import {useRecoilValue, useRecoilState, useResetRecoilState} from 'recoil';
import { isSignedIn, starCount, userInfo } from '../state/user';
import {isModalOpen} from '../state/ui';
import { Modal } from 'react-responsive-modal';

import 'react-responsive-modal/styles.css';
import './AccountModal.scss'
import { totalStarsInAllPuzzles } from '../state/puzzle';

export default function AccountModal() {
  const [open, setOpen] = useRecoilState(isModalOpen('Account'));
  const user = useRecoilValue(userInfo)
  const userStars = useRecoilValue(starCount)
  const totalStars = useRecoilValue(totalStarsInAllPuzzles)
  const resetUser = useResetRecoilState(userInfo)
  const resetIsSignedIn = useResetRecoilState(isSignedIn)
  const history = useHistory();
  
  const onClose = () => {
    setOpen(false)
  } 
  
  const onSignOut = async () => {
    const res = await fetch('/auth/signout')

    if (res.status === 200) {
      setOpen(false);
      
      // Reset user and sign in atoms
      resetUser();
      resetIsSignedIn();
      
      history.push('/');
    }
  }

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      center
      classNames={{
        modal: 'account-modal__container',
        closeButton: 'account-modal__close-btn'
      }}
    >
        <div className="account-modal">
          <img 
            className='account-modal__img' 
            alt={`${user.first}'s profile pic`} 
            src={user.pic} />
          <div className="account-modal__title">{user.first}'s Account</div>
          <div className='account-modal__body'>
            <div className='account-modal__msg'>
              Earned {(userStars / totalStars * 100).toPrecision(3)}% of 
                <span className='account-modal__star'>★</span>
            </div>
            <button 
              onClick={onSignOut} 
              className='account-modal__btn'>
                Sign Out
            </button>
          </div>
        </div>
    </Modal>
  );
};