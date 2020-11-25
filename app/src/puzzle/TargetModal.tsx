import React from 'react';
import {useRecoilState} from 'recoil';
import {puzzleStates} from '../state/puzzle';
import {isSuccessModalOpen} from '../state/ui';
import { Modal } from 'react-responsive-modal';
import Goals from './Goals'

import 'react-responsive-modal/styles.css';
import './TargetModal.scss'

export default function TargetModal () {
  const [puzStates, setPuzStates] = useRecoilState(puzzleStates)
  const [open, setOpen] = useRecoilState(isSuccessModalOpen)
  const moves = puzStates.length - 1

  const onClose = () => {
    setPuzStates((prev) => prev.slice(0,1)) // Reset to initial puzzle condition
    setOpen(false) // Close the modal
  } 

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      center
      closeOnOverlayClick={false}
      classNames={{
        modal: 'target-modal__container',
        closeButton: 'target-modal__close-btn'
      }}
    >
        <div className="target-modal">
          <div className="target-modal__title">Success!</div>
          <div className='target-modal__body'>
            <div className='target-modal__msg'>You solved this puzzle in {moves} moves.</div>
            <div className="target-modal__goals"><Goals/></div>
          </div>
        </div>
    </Modal>
  );
};