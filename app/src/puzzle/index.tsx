import {Puzzle} from '../structs/puzzle';
import {PuzProgress} from '../structs/user'

import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {puzzle, puzzleStates} from '../state/puzzle'
import {userInfo} from '../state/user'

import Goals from './Goals'
import CalcFunctions from './CalcFunctions';
import TargetModal from './TargetModal';

import puzzleData from '../puzzles.json'
import './index.scss'

interface Params {
  puz_id: string;
}

interface PuzData {
  [key: string]: Puzzle
}

export default function PuzzlePage() {
  // Global State
  const [puz, setPuz] = useRecoilState(puzzle)
  const [puzStates, setPuzStates] = useRecoilState(puzzleStates)
  const [user, setUser] = useRecoilState(userInfo)
  
  // Component State
  const [open, setOpen] = useState(false)
  const {puz_id} = useParams<Params>()

  // Load puzzle data and assign type
  const puzzleList = puzzleData as PuzData

  useEffect(()=>{
    const currentPuz = puzzleList[puz_id]
    
    
    setOpen(false) // Close Modal if Open
    setPuz(currentPuz) // Load puzzle into state
    setPuzStates([{val: currentPuz.start, limits: []}]) // Load initial state

    // Check if the user has the details in the progress
    if (!user.progress[puz_id]) {
      
      // Generate star progress for this user
      let initProgressCurrPuz = {
        stars: {},
      } as PuzProgress
      currentPuz.stars.forEach(s => {initProgressCurrPuz.stars[s.value.toString()] = false})
      
      setUser((prev) => ({
        ...prev,
        progress: {
          ...prev.progress,
          [puz_id]: initProgressCurrPuz
        },
      }))
    }
  }, [puz_id, puzzleList, setPuz, setPuzStates, setUser, user])

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