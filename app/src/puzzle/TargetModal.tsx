import React from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {puzzleStates} from '../state/puzzle';
import {isSuccessModalOpen} from '../state/ui';
import { Modal } from 'react-responsive-modal';
import Goals from './Goals'

import 'react-responsive-modal/styles.css';
import './TargetModal.scss'

export default function TargetModal () {
  const puzStates = useRecoilValue(puzzleStates)
  const [open, setOpen] = useRecoilState(isSuccessModalOpen)
  const moves = puzStates.length - 1

  return (
    <Modal 
      open={open} 
      onClose={() => setOpen(false)} 
      center
      closeOnOverlayClick={false}
      classNames={{modal: 'target-modal__container'}}
    >
        <div className="target-modal">
          <div className="target-modal__title">Success!</div>
          <div className='target-modal__body'>
            <div className='target-modal__msg'>You solved this puzzle in {moves} moves.</div>
            <Goals/>
          </div>
        </div>
    </Modal>
  );
};