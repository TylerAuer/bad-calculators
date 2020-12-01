import { useRecoilValue, useRecoilState } from 'recoil';
import {
  redoStates,
  puzzle,
  puzzleStates,
} from '../state/puzzle';

import CalcBtn from './CalcBtn';
import OpBtn from './OpBtn'


export default function CalcFunctions () {
  const puz = useRecoilValue(puzzle)
  const [puzStates, setPuzStates] = useRecoilState(puzzleStates)
  const [redo, setRedo] = useRecoilState(redoStates)

  // Don't render until a puzzle is loaded
  if (!puz) return null

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
  
  const listOfOpBtns = puz.operations.map((op, i) => <OpBtn key={i} index={i} info={op}/>)

  return (
    <>
      <div className="calc__functions">
        {listOfOpBtns}
      </div>
      <div className="calc__controls">
        <CalcBtn onClick={handleUndo} text='Undo'/>
        <CalcBtn onClick={handleRedo} text='Redo'/>
        <CalcBtn onClick={handleReset} text='Reset'/>
      </div>
    </>
    )  
}