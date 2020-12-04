import { Puzzle } from '../structs/puzzle';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { PuzProgress } from '../structs/user';
import { puzzleIsLoading } from '../state/ui';
import { puzzle, puzzleStates } from '../state/puzzle';
import { userInfo } from '../state/user';

export default async function useLoadPuzzle(id: string) {
  const [puz, setPuz] = useRecoilState(puzzle);
  const setPuzStates = useSetRecoilState(puzzleStates);
  const [user, setUser] = useRecoilState(userInfo);
  const [puzIsLoading, setPuzIsLoading] = useRecoilState(puzzleIsLoading);
  const history = useHistory();

  if (puzIsLoading) {
    return;
  }

  // If there isn't a puzzle loaded or
  // the current puzzle's id doesn't match the url param
  // then load the correct puzzle
  if (!puz || puz.id !== parseInt(id)) {
    setPuzIsLoading(true);
    const res = await fetch(`/puzzle/${id}`);

    if (res.status >= 400) {
      setPuzIsLoading(false);
      history.push('/puzzle/0');
    }

    const currentPuz: Puzzle = await res.json();

    setPuz(currentPuz); // Load puzzle into state
    setPuzStates([
      {
        val: currentPuz.start,
        counts: Array<number>(currentPuz.operations.length).fill(0),
      },
    ]); // Load initial state

    // Check if the user has the details in the progress
    if (!user.progress[id]) {
      // Generate star progress for this user
      let initProgressCurrPuz: PuzProgress = Array<boolean>(
        currentPuz.stars.length
      ).fill(false);

      setUser((prev) => ({
        ...prev,
        progress: {
          ...prev.progress,
          [id]: initProgressCurrPuz,
        },
      }));
    }

    setPuzIsLoading(false);
  }
}
