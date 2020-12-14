import { SignInStatus } from '../structs/user';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { puzzle, puzzleStates } from '../state/puzzle';
import { signInState, userInfo } from '../state/user';
import { isModalOpen } from '../state/ui';
import { attemptStatus } from '../state/track';
import useLoadPuzzle from '../hooks/useLoadPuzzle';
import saveUserProgress from '../requests/saveUserProgress';
import trackAttempt from '../requests/trackAttempt';
import Screen from './Screen';
import Meta from './Meta';
import Goals from './Goals';
import CalcFunctions from './CalcFunctions';
import SolvedModal from './SolvedModal';
import Spinner from '../spinner';
import { TrackAttemptStatus } from '../structs/track';
import trackSuccess from '../requests/trackSuccess';
import './index.scss';

interface Params {
  puz_id: string;
}

export default function PuzzlePage() {
  const puz = useRecoilValue(puzzle);
  const puzStates = useRecoilValue(puzzleStates);
  const signedIn = useRecoilValue(signInState);
  const [user, setUser] = useRecoilState(userInfo);
  const [attempt, setAttempt] = useRecoilState(attemptStatus);
  const [modalIsOpen, setIsModalOpen] = useRecoilState(isModalOpen('Solved'));

  const { puz_id } = useParams<Params>();

  // Close modal if it is open when the component first mounts
  // or when the puz_id changes
  useEffect(() => {
    setIsModalOpen(false); // Close Modal if open when new puzzle loads
  }, [puz_id, setIsModalOpen, setAttempt]);

  // Load the puzzle if it isn't yet loaded or loading
  useLoadPuzzle(puz_id);

  // Hide calculator until puzzle is loaded
  if (!puz || !puzStates.length || puz_id !== puz.id.toString())
    return <Spinner />;

  const currentState = puzStates[puzStates.length - 1];

  // Checks if an attempt should be logged
  if (attempt === TrackAttemptStatus.INACTIVE && puzStates.length === 3) {
    setAttempt(TrackAttemptStatus.IN_PROGRESS);
    trackAttempt(puz.id);
  }

  // Checks if attempt has concluded and Attempt Status should reset to inactive
  if (attempt === TrackAttemptStatus.IN_PROGRESS && puzStates.length === 1) {
    setAttempt(TrackAttemptStatus.INACTIVE);
  }

  const onReachPuzTarget = async () => {
    // Get array of goals
    if (!puz) return;
    const { stars } = puz;

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

    trackSuccess(puz.id, goalsMet);

    if (!modalIsOpen) setIsModalOpen(true);

    // Update this puzzles progress with any stars
    const thisPuzzlesUpdatedProgressArr = [...user.progress[puz_id]];
    goalsMet.forEach((goal) => {
      thisPuzzlesUpdatedProgressArr[goal] = true;
    });

    if (signedIn === SignInStatus.SIGNED_IN) {
      const progressSyncedWithBackend = await saveUserProgress({
        [puz_id]: thisPuzzlesUpdatedProgressArr,
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
          [puz_id]: thisPuzzlesUpdatedProgressArr,
        },
      }));
    }
  };

  // Opens modal if at target value
  if (currentState.val === puz.target && !modalIsOpen) {
    onReachPuzTarget();
  }

  return (
    <div className="calc">
      <SolvedModal />

      <div className="calc__above">
        <Goals />
      </div>

      <div className="calc__body">
        <Screen />
        <Meta />
        <CalcFunctions />
      </div>

      <div className="calc__below">
        <div className="calc__left">
          <Link to={`/level/${puz.level}`}>Level {puz.level}</Link>
        </div>
        <div className="calc__right">
          Puzzle {puz.level}-{puz.indexInLevel} by {puz.creator}
        </div>
      </div>
    </div>
  );
}
