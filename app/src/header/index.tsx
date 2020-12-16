import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { starCount } from '../state/user';
import { totalStarsInAllPuzzles } from '../state/puzzle';

import './index.scss';
import UserAccount from './UserAccount';

function TotalStars() {
  const totalStars = useRecoilValue(totalStarsInAllPuzzles);
  return <span className="header__total-stars">/ {totalStars}</span>;
}

export function UnwrappedHeader() {
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

export default function Header() {
  return (
    <Suspense fallback={''}>
      <UnwrappedHeader />
    </Suspense>
  );
}
