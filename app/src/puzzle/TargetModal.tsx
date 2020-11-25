import React from 'react';
import {useRecoilValue} from 'recoil';
import {puzzle, puzzleStates} from '../state/puzzle';
import {userInfo} from '../state/user';

import { Modal } from 'react-responsive-modal';
import Goals from './Goals'


import 'react-responsive-modal/styles.css';
import './TargetModal.scss'

interface Props {
  open: boolean,
  setOpen: (open: boolean) => void,
}

export default function TargetModal ({open, setOpen}: Props) {
  const puz = useRecoilValue(puzzle)
  const puzStates = useRecoilValue(puzzleStates)
  const {progress} = useRecoilValue(userInfo)

  const moves = puzStates.length - 1

  const onCloseModal = () => setOpen(false);

  return (
    <Modal open={open} onClose={onCloseModal} center>
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