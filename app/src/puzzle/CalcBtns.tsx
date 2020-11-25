import { useRecoilValue, useRecoilState } from 'recoil';
import {
  redoStates,
  puzzle,
  puzzleStates,
} from '../state/puzzle';

import OpBtn from './OpBtn'


export default function CalcBtns () {
  const puz = useRecoilValue(puzzle)
  const [puzStates, setPuzStates] = useRecoilState(puzzleStates)
  const [redo, setRedo] = useRecoilState(redoStates)

  const handleReset = () => {
    setPuzStates((prev) => prev.slice(0, 1))
    setRedo([])
  }
  
  const handleUndo = () => {
    if (puzStates.length > 1) {
      const stateToMoveToRedo = puzStates[puzStates.length - 1]
      setPuzStates((prev) => prev.slice(0, prev.length - 1))
      setRedo((prev) => [...prev, stateToMoveToRedo])
    }
  }
  
  const handleRedo = () => {
    if (redo.length) {
      const stateRestoredFromRedo = redo[redo.length - 1]
      setPuzStates((prev) => [...prev, stateRestoredFromRedo])
      setRedo((prev) => prev.slice(0,redo.length - 1))
    }
  }
  
  const listOfOpBtns = puz.operations.map((op, i) => <OpBtn  key={i} info={op}/>)

  return (
    <>
      <div className="functions">
        {listOfOpBtns}
      </div>
      <div className="controls">
        <button className='ctrl-btn' onClick={handleUndo} >Undo</button>
        <button className='ctrl-btn' onClick={handleRedo}>Redo</button>
        <button className='ctrl-btn' onClick={handleReset}>Reset</button>
      </div>
    </>
    )  
}