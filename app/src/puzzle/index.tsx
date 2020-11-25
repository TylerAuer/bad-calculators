// STATE & HOOKS
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {puzzle, puzzleStates} from '../state/puzzle'
import {isSuccessModalOpen} from '../state/ui'
import useLoadPuzzle from '../hooks/useLoadPuzzle'
// COMPONENTS
import Goals from './Goals'
import CalcFunctions from './CalcFunctions';
import TargetModal from './TargetModal';
// UTILS, DATA, FILES

import './index.scss'

interface Params {
  puz_id: string;
}

export default function PuzzlePage() {
  const puz = useRecoilValue(puzzle)
  const puzStates = useRecoilValue(puzzleStates)
  const setIsModalOpen = useSetRecoilState(isSuccessModalOpen)

  const {puz_id} = useParams<Params>()
  

  // Loads puzzle, user's progress, and initial state for puzzle
  useEffect(() => {
    setIsModalOpen(false) // Close Modal if open when new puzzle loads
  }, [puz_id, setIsModalOpen]); 

  useLoadPuzzle(puz_id)

  // Hides calculator until puzzle is loaded
  if (!puz || !puzStates.length) return null

  const currentState = puzStates[puzStates.length - 1]

  // Opens modal if at target value
  if (currentState.val === puz.target) {
    setIsModalOpen(true)
  }
  
  return (
    <div className="calc">
      <TargetModal/>

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