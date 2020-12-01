import {Suspense} from 'react';
import {useRecoilValue} from 'recoil';
import {starCount} from '../state/user';
import {totalStarsInAllPuzzles} from '../state/puzzle';

import './Header.scss'

function TotalStars() {
  const totalStars = useRecoilValue(totalStarsInAllPuzzles)
  return (<span> / {totalStars}</span>)
}

export default function Header() {
  const userStars = useRecoilValue(starCount)

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