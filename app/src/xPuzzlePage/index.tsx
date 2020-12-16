import { TrackAttemptStatus } from '../structs/track';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { useParams, Link } from 'react-router-dom';
import { puzzle, puzzleStates } from '../state/puzzle';
import { isModalOpen } from '../state/ui';
import { attemptStatus } from '../state/track';
import useLoadPuzzle from '../hooks/useLoadPuzzle';
import ResolveModal from './ResolveModal';
import trackAttempt from '../functions/trackAttempt';
import Screen from './Screen';
import Meta from './Meta';
import Goals from './Goals';
import CalcFunctions from './CalcFunctions';
import Spinner from '../Spinner';
import MoveCount from './MoveCount';
import './index.scss';

interface Params {
  puz_id: string;
}

export default function PuzzlePage() {
  const puz = useRecoilValue(puzzle);
  const puzStates = useRecoilValue(puzzleStates);
  const [attempt, setAttempt] = useRecoilState(attemptStatus);
  const setIsModalOpen = useSetRecoilState(isModalOpen('ResolvePuzzle'));

  const { puz_id } = useParams<Params>();

  // Close modal if it is open when the component first mounts
  // or when the puz_id changes
  useEffect(() => {
    setIsModalOpen(false);
  }, [puz, setIsModalOpen]);

  // Load the puzzle if it isn't yet loaded or loading
  useLoadPuzzle(puz_id);

  // Hide calculator until puzzle is loaded
  if (!puz || !puzStates.length || puz_id !== puz.id.toString()) {
    return <Spinner />;
  }

  // Checks if an attempt should be logged
  if (attempt === TrackAttemptStatus.INACTIVE && puzStates.length === 3) {
    setAttempt(TrackAttemptStatus.IN_PROGRESS);
    trackAttempt(puz.id);
  }

  // Checks if attempt has concluded and Attempt Status should reset to inactive
  if (attempt === TrackAttemptStatus.IN_PROGRESS && puzStates.length === 1) {
    setAttempt(TrackAttemptStatus.INACTIVE);
  }

  return (
    <div className="calc">
      <ResolveModal />
      <div className="calc__above">
        <Goals />
      </div>
      <div className="calc__body">
        <Meta />
        <Screen />
        <MoveCount />
        <CalcFunctions />
      </div>
      <div className="calc__below">
        <Link to={`/level/${puz.level}`}>Level {puz.level}</Link>
        <div>
          Puzzle {puz.level}-{puz.indexInLevel} by {puz.creator}
        </div>
      </div>
    </div>
  );
}
