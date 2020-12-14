import { useRecoilValue } from 'recoil';
import { puzzleStates } from '../state/puzzle';

import './Screen.scss';

export default function Screen() {
  const puzStates = useRecoilValue(puzzleStates);

  const current = puzStates[puzStates.length - 1];
  const { val, historyString } = current;

  return (
    <div className="screen">
      <div className="screen__value">{val}</div>
      <div className="screen__history">{historyString}</div>
    </div>
  );
}
