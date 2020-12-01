import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useRecoilValue, useSetRecoilState, useRecoilState} from 'recoil';
import {puzzle, puzzleStates} from '../state/puzzle'
import {userInfo} from '../state/user'
import {isSuccessModalOpen} from '../state/ui'
import useLoadPuzzle from '../hooks/useLoadPuzzle'

import Goals from './Goals'
import CalcFunctions from './CalcFunctions';
import SuccessModal from './SuccessModal';

import './index.scss'

interface Params {
  puz_id: string;
}

export default function PuzzlePage() {
  const puz = useRecoilValue(puzzle)
  const puzStates = useRecoilValue(puzzleStates)
  const setUser = useSetRecoilState(userInfo)
  const [modalIsOpen, setIsModalOpen] = useRecoilState(isSuccessModalOpen)

  const {puz_id} = useParams<Params>()
  
  
  // Close modal if it is open when the component first mounts
  // or when the puz_id changes
  useEffect(() => {
    setIsModalOpen(false) // Close Modal if open when new puzzle loads
  }, [puz_id, setIsModalOpen]);
  
  // Load the puzzle if it isn't yet loaded
  useLoadPuzzle(puz_id)

  // Hide calculator until puzzle is loaded
  if (!puz || !puzStates.length || puz_id !== puz.id.toString()) return null

  const currentState = puzStates[puzStates.length - 1]

  
  const handleSolvePuzzle = () => {
    // Get array of goals
    if (!puz) return;
    const { stars } = puz;
    
    const moveCount = puzStates.length - 1;
    
    // List of goals just met
    const goalsMet = [] as number[];
    
    stars.forEach((s) => {
      // Handle different goal possibilities
      if (
        (!s.moves) || // Handle goal with no move limit
        (s.goalRelation === 'more' && moveCount > s.moves) ||
        (s.goalRelation === 'exactly' && moveCount === s.moves) ||
        (s.goalRelation === 'fewer' && moveCount <= s.moves)
        ) {
          goalsMet.push(s.value);
        }
      });
      
    if (!modalIsOpen) setIsModalOpen(true)
    setUser((prev) => {
      // Update the newStars
      const newStars = {...prev.progress[puz_id].stars}
      goalsMet.forEach(goal => {
        newStars[goal] = true
      })

      // Return the updated UserInfo object
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [puz_id]: {
            ...prev.progress[puz_id],
            stars: newStars
          }
        }
      }
    })

  }
    
    
  // Opens modal if at target value
  if (currentState.val === puz.target && !modalIsOpen) {
    handleSolvePuzzle()
  }

  return (
    <div className="calc">
      <SuccessModal/>

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
        <div className="calc__left">Attempts: {puz.attemptCount}</div>
        <div className="calc__right">Puzzle {puz.level}-{puz.indexInLevel} by {puz.creator}</div>
      </div>

    </div>
  )
}