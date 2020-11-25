import {useState} from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {puzzle, puzzleStates} from '../state/puzzle'
import {userInfo} from '../state/user'

import Goals from './Goals'
import CalcFunctions from './CalcFunctions';

import './index.scss'
import TargetModal from './TargetModal';

export default function PuzzlePage() {
  const puz = useRecoilValue(puzzle)
  const puzStates = useRecoilValue(puzzleStates)
  const [user, setUser] = useRecoilState(userInfo)
  
  const [open, setOpen] = useState(false)
  
  // Hides calculator until puzzle is loaded
  if (!puz || !puzStates.length) return null

  const currentState = puzStates[puzStates.length - 1]

  // Opens modal if at target value
  if (currentState.val === puz.target && !open) {
    setOpen(true)
  }
  
  return (
    <div className="calc">
      <TargetModal open={open} setOpen={setOpen}/>

      <div className="calc__above">
        <Goals stars={puz.stars}/>
      </div>
      
      <div className="calc__body">
        <div className="calc__screen">{currentState.val}</div>
        <div className="calc__meta">
          <div className="calc__moves">Moves: {puzStates.length - 1}</div>
          <div className="calc__target">Target: {puz.target}</div>
        </div>
        <CalcFunctions />
      </div>
      
      <div className="calc__below">
        <div className="calc__left"></div>
        <div className="calc__right">Puzzle {puz.label} by {puz.creator}</div>
      </div>

    </div>
  )
}