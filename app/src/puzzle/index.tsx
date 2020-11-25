import {Puzzle} from '../structs/puzzle'

import {useRecoilValue, useRecoilState} from 'recoil';
import {puzzle, puzzleStates, redoStates } from '../state/puzzle'

import Goals from './Goals'
import CalcBtns from './CalcBtns';

import './index.scss'

export default function PuzzlePage() {
  // const [future, setFuture] = useRecoilState(moveFuture)
  const puz = useRecoilValue(puzzle)
  const [puzStates, setPuzStates] = useRecoilState(puzzleStates)

  // Hides calculator until puzzle is loaded
  if (!puz || !puzStates.length) return null

  const currentState = puzStates[puzStates.length - 1]
  
  const [level, id] = puz.id.split('_')
  
  return (
    <div id="calc">
      <div className="above">
        <Goals stars={puz.stars}/>
      </div>
      <div className="body">
        <div className="screen">
          {currentState.val}
        </div>
        <div className="goal-msg">
          Reach {puz.goal} to earn the stars above.
        </div>
        <CalcBtns />
      </div>
      <div className="below">
        <div className="left">
          Puzzle {level}{id} by {puz.creator}
        </div>
        <div className="right">
          Moves Made: {puzStates.length - 1}
        </div>
      </div>
    </div>
  )
}