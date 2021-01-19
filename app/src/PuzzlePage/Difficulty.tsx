import ordinal from 'ordinal';
import { useRecoilValue } from 'recoil';
import { puzzle } from '../state/puzzle';
import './Difficulty.scss';

export default function Difficulty() {
  const puz = useRecoilValue(puzzle);

  if (!puz || !puz.difficulty) {
    return <div></div>;
  }

  const emojiForLevel: { [key: number]: string } = {
    '1': '😀',
    '2': '🤨',
    '3': '🤔',
    '4': '😰',
    '5': '😳',
    '6': '😭',
    '7': '🤯',
  };

  const emoji = emojiForLevel[puz.difficulty.discrete] || '🤷‍♂️';

  return (
    <div className="difficulty">
      <div>
        {ordinal(puz.difficulty.ordinal)} hardest of{' '}
        {puz.difficulty.countOfPuzzles} puzzles
      </div>
      <div>
        {puz.difficulty.raw.toFixed(2)} stars / attempt {emoji}
      </div>
    </div>
  );
}
