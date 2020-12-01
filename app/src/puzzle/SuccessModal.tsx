import React from 'react';
import {useHistory} from 'react-router-dom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {puzzle, puzzleStates} from '../state/puzzle';
import {isSuccessModalOpen} from '../state/ui';
import { Modal } from 'react-responsive-modal';
import Goals from './Goals'

import 'react-responsive-modal/styles.css';
import './SuccessModal.scss'

export default function SuccessModal () {
  const history = useHistory();
  const puz = useRecoilValue(puzzle);
  const [puzStates, setPuzStates] = useRecoilState(puzzleStates);
  const [open, setOpen] = useRecoilState(isSuccessModalOpen);
  const moves = puzStates.length - 1;
  
  // Don't display if no puzzle is loaded
  if (!puz) return null;
  
  const onClose = () => {
    setPuzStates((prev) => prev.slice(0,1)) // Reset to initial puzzle condition
    setOpen(false) // Close the modal
  } 

  const onBackToLvlClick = () => {
    history.push(`/level/${puz.level}`)
  }


  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      center
      closeOnOverlayClick={false}
      classNames={{
        modal: 'success-modal__container',
        closeButton: 'success-modal__close-btn'
      }}
    >
        <div className="success-modal">
          <div className="success-modal__title">Success!</div>
          <div className='success-modal__body'>
            <div className='success-modal__msg'>
              You solved this puzzle in {moves} moves.
            </div>
            <div className="success-modal__goals">
              <Goals/>
            </div>
            <button 
              onClick={onBackToLvlClick} 
              className='success-modal__btn'>
                Level {puz.level} Puzzles
            </button>
            <button 
              onClick={onClose} 
              className='success-modal__btn'>
                Try Again
            </button>
          </div>
        </div>
    </Modal>
  );
};