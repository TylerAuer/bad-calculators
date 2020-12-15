import { SignInStatus } from '../structs/user';
import { useRecoilValue, useRecoilState } from 'recoil';
import { puzzle, puzzleStates } from '../state/puzzle';
import { signInState, userInfo } from '../state/user';
import { isModalOpen } from '../state/ui';
import saveUserProgress from '../requests/saveUserProgress';
import trackSuccess from '../requests/trackSuccess';
import SolvedModal from './ResolveModal';

/**
 * Checks if the user has reached the puzzle's goal or hit a block
 */
export default function MonitorPuzzleProgress() {
  const puz = useRecoilValue(puzzle);
  const puzStates = useRecoilValue(puzzleStates);
  const signedIn = useRecoilValue(signInState);
  const [user, setUser] = useRecoilState(userInfo);
  const [modalIsOpen, setIsModalOpen] = useRecoilState(
    isModalOpen('ResolvePuzzle')
  );

  const currentState = puzStates[puzStates.length - 1];
  const { val } = currentState;

  if (puz?.blocks.indexOf(val) !== -1) {
    // Handle reaching block
    setIsModalOpen(true);
  }
  if (val === puz?.target) {
    // Handle reaching goal
    handleReachingGoal();
  }

  return <SolvedModal />;

  /**
   * Logs success to the server and updates local state
   */
  async function handleReachingGoal() {
    const { stars } = puz!;

    const moveCount = puzStates.length - 1;

    // List of goals just met
    const goalsMet: number[] = [];
    stars.forEach((s, i) => {
      // Handle different goal possibilities
      if (
        !s.moves || // Handle goal with no move limit
        (s.goalRelation === 'more' && moveCount > s.moves) ||
        (s.goalRelation === 'exactly' && moveCount === s.moves) ||
        (s.goalRelation === 'fewer' && moveCount <= s.moves)
      ) {
        goalsMet.push(i);
      }
    });

    trackSuccess(puz!.id, goalsMet);

    if (!modalIsOpen) setIsModalOpen(true);

    // Update this puzzles progress with any stars
    const thisPuzzlesUpdatedProgressArr = [...user.progress[puz!.id]];
    goalsMet.forEach((goal) => {
      thisPuzzlesUpdatedProgressArr[goal] = true;
    });

    if (signedIn === SignInStatus.SIGNED_IN) {
      const progressSyncedWithBackend = await saveUserProgress({
        [puz!.id]: thisPuzzlesUpdatedProgressArr,
      });

      setUser((prev) => ({
        ...prev,
        progress: progressSyncedWithBackend,
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        progress: {
          ...prev.progress,
          [puz!.id]: thisPuzzlesUpdatedProgressArr,
        },
      }));
    }
    return;
  }
}
