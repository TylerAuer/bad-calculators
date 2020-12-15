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
      {puz.start} {hasBlocks && blocks}
      &rarr; {puz.target} &#9873;
    </div>
  );
}
