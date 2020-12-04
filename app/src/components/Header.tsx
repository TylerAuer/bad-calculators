import {Suspense, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {starCount, isSignedIn} from '../state/user';
import {totalStarsInAllPuzzles} from '../state/puzzle';
import useCheckForUser from '../hooks/useCheckForUser';

import './Header.scss'

function TotalStars() {
  const totalStars = useRecoilValue(totalStarsInAllPuzzles)
  return (<span> / {totalStars}</span>)
}

export default function Header() {
  let history = useHistory()
  const userStars = useRecoilValue(starCount)
  const signedIn = useRecoilValue(isSignedIn)
  const checkForUser = useCheckForUser()

  /**
   * When the component mounts, the page checks if the user is authenticated.
   * 
   * The server returns the user's info and progress if authenticated
   */
  useEffect(() => {
    checkForUser();
  }, [checkForUser])

  if(signedIn) history.push('/level/1')

  return (
    <header className='header'>
      <div>Bad Calculators</div>
      <div>
        {userStars}
        <Suspense fallback={''}><TotalStars/></Suspense>
        <span className='header__star'> ★</span>
        </div>
    </header>
  )
}