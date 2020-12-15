import { useRecoilValue } from 'recoil';
import { puzzleStates } from '../state/puzzle';
import './MoveCount.scss';

export default function MoveCount() {
  const puzStates = useRecoilValue(puzzleStates);

  return <div className="move-count">Moves: {puzStates.length - 1}</div>;
}
