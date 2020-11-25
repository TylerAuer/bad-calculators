import { OpInfo } from '../structs/puzzle';

import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  redoStates,
  puzzleStates,
} from '../state/puzzle';

import './OpBtn.scss';
import genOpBtnTextAndOp from '../utils/genOpBtnTextAndOp';

interface Props {
  info: OpInfo;
}

export default function OpBtn({ info }: Props) {
  const [puzStates, setPuzStates] = useRecoilState(puzzleStates);
  const setRedoStates = useSetRecoilState(redoStates);

  const {text, op} = genOpBtnTextAndOp(info)
  
  const handleClick = () => {
    const newState = {
      ...puzStates[puzStates.length - 1],
      val: op(puzStates[puzStates.length - 1].val)
    }

    setPuzStates((prev) => ([...prev, newState]))

    // Clear future since you've gone down a new branch of the timeline
    setRedoStates([])
  }


  return (
    <button className="op-btn" onClick={handleClick}>{text}</button>
  )
}
