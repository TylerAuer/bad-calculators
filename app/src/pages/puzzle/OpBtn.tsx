import { OpInfo } from '../../structs/puzzle';

import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  moveFuture,
  moveHistory,
  screenVal,
} from '../../state/puzzle';

import './OpBtn.scss';
import genOpBtnTextAndOp from '../../utils/genOpBtnTextAndOp';

interface Props {
  info: OpInfo;
}

export default function OpBtn({ info }: Props) {
  const setScreen = useSetRecoilState(screenVal);
  const setHist = useSetRecoilState(moveHistory);
  const setFuture = useSetRecoilState(moveFuture);

  const {text, op} = genOpBtnTextAndOp(info)
  
  const handleClick = () => {
    
    setScreen((prev) => op(prev)) // Update the screen
    setHist((prev) => [...prev, 1])
    setFuture([]) // Clear future since you've moved down a new branch

  }


  return (
    <button className="op-btn" onClick={handleClick}>{text}</button>
  )
}
