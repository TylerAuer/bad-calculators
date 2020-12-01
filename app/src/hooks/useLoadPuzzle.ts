import { Puzzle } from '../structs/puzzle';
import { PuzProgress } from '../structs/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { puzzle, puzzleStates } from '../state/puzzle';
import { userInfo } from '../state/user';

export default async function useLoadPuzzle(id: string) {
  const [puz, setPuz] = useRecoilState(puzzle);
  const setPuzStates = useSetRecoilState(puzzleStates);
  const [user, setUser] = useRecoilState(userInfo);

  // If there isn't a puzzle loaded or
  // the current puzzle's id doesn't match the url param
  // then load the correct puzzle
  if (!puz || puz.id !== parseInt(id)) {
    // TODO: Add a check for a 404 error. If 404 redirect to 404 page
    const res = await fetch(`/puzzle/${id}`);
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
  }
}
