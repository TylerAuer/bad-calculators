import ordinal from 'ordinal';
import { useRecoilValue } from 'recoil';
import { puzzle } from '../state/puzzle';
import './Difficulty.scss';

export default function Difficulty() {
  const puz = useRecoilValue(puzzle);

  if (!puz || !puz.difficulty) {
    return <div className="difficulty">Difficulty: more data needed 🤷‍♂️ </div>;
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
      <div>{puz.difficulty.raw.toFixed(2)} stars / attempt</div>
      <div>
        {ordinal(puz.difficulty.ordinal)} hardest {emoji}
      </div>
    </div>
  );
}
