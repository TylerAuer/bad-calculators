import { useRecoilValue } from 'recoil';
import { puzzle } from '../state/puzzle';
import { Link } from 'react-router-dom';

export default function LevelAndPuzzle() {
  const puz = useRecoilValue(puzzle);

  if (!puz) return null;

  return (
    <div className="level-and-puzzle">
      <div>
        <Link to={`/level/${puz.level}`}>Back to Level {puz.level}</Link>
      </div>
      <div>
        Puzzle: {puz.level}-{puz.indexInLevel}
      </div>
    </div>
  );
}
