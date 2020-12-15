import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { puzzle, puzzleStates } from '../state/puzzle';
import { isModalOpen } from '../state/ui';
import { Modal } from 'react-responsive-modal';
import Goals from './Goals';

import 'react-responsive-modal/styles.css';
import './ResolveModal.scss';

export default function ResolveModal() {
  const history = useHistory();
  const [puz, setPuz] = useRecoilState(puzzle);
  const [puzStates, setPuzStates] = useRecoilState(puzzleStates);
  const [open, setOpen] = useRecoilState(isModalOpen('ResolvePuzzle'));

  // Don't display if no puzzle is loaded
  if (!puz) return null;

  const currState = puzStates[puzStates.length - 1];
  const hasReachedTarget = puz.target === currState.val;
  const moves = puzStates.length - 1;

  // List of goals just met
  const goalsMet: number[] = [];
  puz.stars.forEach((s, i) => {
    // Handle different goal possibilities
    if (
      !s.moves || // Handle goal with no move limit
      (s.goalRelation === 'more' && moves > s.moves) ||
      (s.goalRelation === 'exactly' && moves === s.moves) ||
      (s.goalRelation === 'fewer' && moves <= s.moves)
    ) {
      goalsMet.push(i);
    }
  });

  const onClose = () => {
    setOpen(false); // Close the modal
    setPuzStates((prev) => prev.slice(0, 1));
  };

  const onBackToLvlClick = () => {
    history.push(`/level/${puz.level}`);
    setOpen(false); // Close the modal
    setPuz(null); // Reset to initial puzzle condition
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      closeOnOverlayClick={false}
      animationDuration={0}
      classNames={{
        modal: 'success-modal__container',
        closeButton: 'success-modal__close-btn',
      }}
    >
      <div className="success-modal">
        <div className="success-modal__title">
          {hasReachedTarget
            ? 'Target Reached!'
            : `Blocked by ${currState.val}!`}
        </div>
        <div className="success-modal__body">
          <div className="success-modal__msg">
            <div>
              {hasReachedTarget
                ? `You solved this puzzle in ${moves} moves.`
                : `You must reach to the target number while avoiding the blocks shown above the calculator screen.`}
            </div>
            <div className="success-modal__hist">{currState.historyString}</div>
          </div>
          <div className="success-modal__goals">
            <Goals />
          </div>
          <button onClick={onClose} className="success-modal__btn">
            Try Again
          </button>
          <button onClick={onBackToLvlClick} className="success-modal__btn">
            Level {puz.level} Puzzles
          </button>
        </div>
      </div>
    </Modal>
  );
}
