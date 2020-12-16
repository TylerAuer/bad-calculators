import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { puzzle } from '../state/puzzle';
import { progress } from '../state/user';

import './Goals.scss';

const goalMap = {
  exactly: '=',
  fewer: '≤',
  more: '>',
};

export default function Goals() {
  return (
    <Suspense fallback="">
      <UnwrappedGoals />
    </Suspense>
  );
}

function UnwrappedGoals() {
  const puz = useRecoilValue(puzzle);
  const prog = useRecoilValue(progress);

  // Don't render until a puzzle is loaded
  if (!puz) return null;

  const { stars } = puz;

  const elems = stars.map((s, i) => {
    // const hasMetGoal = !!usersCurPuzProgress[i];
    let hasMetGoal = prog[puz.id] && prog[puz.id][i];

    return (
      <div key={i} className="goal">
        <div className="goal-desc">
          {s.moves && s.goalRelation
            ? `${goalMap[s.goalRelation]}${s.moves}`
            : '∞'}
        </div>

        <div
          key={i}
          className={`star-icon ${hasMetGoal ? 'star-success' : ''}`}
        >
          ★
        </div>
      </div>
    );
  });

  return <div className="goal-list">{elems}</div>;
}
