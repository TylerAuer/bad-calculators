import { OpInfo } from '../structs/puzzle';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { redoStates, puzzleStates } from '../state/puzzle';
import genOpBtnTextAndOp from '../utils/genOpBtnTextAndOp';
import CalcBtn from './CalcBtn';

interface Props {
  info: OpInfo;
  index: number;
}

export default function OpBtn({ info, index }: Props) {
  const [puzStates, setPuzStates] = useRecoilState(puzzleStates);
  const setRedoStates = useSetRecoilState(redoStates);

  const { text, op, limit } = genOpBtnTextAndOp(info);

  // Add state to puzStates Stack
  const handleClick = () => {
    setPuzStates((prev) => {
      const next = {
        ...prev[prev.length - 1],
        val: op(prev[prev.length - 1].val),
        counts: [...prev[prev.length - 1].counts],
        historyString: prev[prev.length - 1].historyString + ' ' + text,
      };

      // Increment the counter that tracks button presses
      next.counts[index]++;

      return [...prev, next];
    });

    // Clear future since you've gone down a new branch of the timeline
    setRedoStates([]);
  };

  const usesLeft = limit - puzStates[puzStates.length - 1].counts[index];

  return <CalcBtn onClick={handleClick} text={text} usesLeft={usesLeft} />;
}
