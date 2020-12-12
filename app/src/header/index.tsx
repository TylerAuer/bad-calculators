import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { starCount } from '../state/user';
import { totalStarsInAllPuzzles } from '../state/puzzle';

import './Header.scss';
import UserAccount from './UserAccount';

function TotalStars() {
  const totalStars = useRecoilValue(totalStarsInAllPuzzles);
  return <span className="header__total-stars">/ {totalStars}</span>;
}

export default function Header() {
  const userStars = useRecoilValue(starCount);

  return (
    <header className="header">
      <div>Bad Calculators</div>
      <div className="header__right">
        <span className="header__star"> ★</span>
        {userStars}
        <Suspense fallback={''}>
          <TotalStars />
        </Suspense>
        <UserAccount />
      </div>
    </header>
  );
}
