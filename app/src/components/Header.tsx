import {useRecoilValue} from 'recoil';
import {starCount} from '../state/user';


import './Header.scss'

export default function Header() {
  const stars = useRecoilValue(starCount)

  return (
    <header className='header'>
      <div>Bad Calculators</div>
      <div>Tyler ({stars}x<span className='header__star'>★</span>)</div>
    </header>
  )
}