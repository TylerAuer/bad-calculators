import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { puzzle, puzzleStates, monitorPuzzle } from '../state/puzzle';
import { Modal } from 'react-responsive-modal';
import Goals from './Goals';
import 'react-responsive-modal/styles.css';
import './ResolveModal.scss';

export default function ResolveModal() {
  const history = useHistory();
  const [puz, setPuz] = useRecoilState(puzzle);
  const setPuzStates = useSetRecoilState(puzzleStates);
  const monitor = useRecoilValue(monitorPuzzle);

  const onClose = () => {
    setPuzStates((prev) => prev.slice(0, 1));
  };

  const onBackToLvlClick = () => {
    history.push(`/level/${puz!.level}`);
    setPuz(null); // Reset to initial puzzle condition
  };

  return (
    <Modal
      open={monitor.open}
      onClose={onClose}
      center
      closeOnOverlayClick={false}
      classNames={{
        modal: 'success-modal__container',
        closeButton: 'success-modal__close-btn',
      }}
    >
      <div className="success-modal">
        <div className="success-modal__title">{monitor.title}</div>
        <div className="success-modal__body">
          <div className="success-modal__msg">
            <div>{monitor.message}</div>
            <div className="success-modal__hist">{monitor.history}</div>
          </div>
          <div className="success-modal__goals">
            <Goals />
          </div>
          <button onClick={onClose} className="success-modal__btn">
            Try Again
          </button>
          <button onClick={onBackToLvlClick} className="success-modal__btn">
            Level {puz!.level} Puzzles
          </button>
        </div>
      </div>
    </Modal>
  );
}
