import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {puzzle, puzzleStates} from '../state/puzzle'

import useLoadPuzzle from '../hooks/useLoadPuzzle'

import Goals from './Goals'
import CalcFunctions from './CalcFunctions';
import TargetModal from './TargetModal';

import './index.scss'

interface Params {
  puz_id: string;
}

export default function PuzzlePage() {
  // Component State
  const [open, setOpen] = useState(false)
  const {puz_id} = useParams<Params>()
  
  // Global State
  const puz = useRecoilValue(puzzle)
  const puzStates = useRecoilValue(puzzleStates)
  

  // Loads puzzle, user's progress, and initial state for puzzle
  useEffect(() => {
    setOpen(false) // Close Modal if open when new puzzle loads
  }, [puz_id]); 

  useLoadPuzzle(puz_id)

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
        <Goals/>
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