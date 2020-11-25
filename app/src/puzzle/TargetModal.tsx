import React from 'react';
import { Modal } from 'react-responsive-modal';
import {useRecoilValue} from 'recoil';
import {puzzle, puzzleStates} from '../state/puzzle';
import {userInfo} from '../state/user';

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
          <div className="target-modal__title">
            <h2>Target Reached!</h2>
          </div>
          <div className='target-modal__body'>
            <div>You solved this puzzle in {moves} moves. </div>
          </div>
        </div>
    </Modal>
  );
};