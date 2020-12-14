import { useRecoilValue } from 'recoil';
import { puzzle, puzzleStates } from '../state/puzzle';

import './Meta.scss';

export default function Meta() {
  const puz = useRecoilValue(puzzle);
  const puzStates = useRecoilValue(puzzleStates);

  if (!puz) return <div></div>;

  const blocks = puz.blocks.map((num) => (
    <span key={num} className="meta__block">
      {' '}
      &rarr; {num}{' '}
    </span>
  ));
  const hasBlocks = !!blocks.length;

  return (
    <div className="meta">
      <div className="meta__start-target">
        {puz.start} {hasBlocks && blocks}
        &rarr; {puz.target} &#9873;
      </div>
      <div className="meta__moves">{puzStates.length - 1}</div>
    </div>
  );
}
