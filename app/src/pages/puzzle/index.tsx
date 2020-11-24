import {Puzzle} from '../../structs/puzzle'

import {useRecoilValue, useRecoilState} from 'recoil';
import {puzzle, moveHistory, moveFuture, screenVal} from '../../state/puzzle'

import Goals from './Goals'
import OpBtn from './OpBtn'

import './index.scss'

///////////////////////////////
// Load puzzle for development
import json from '../../../../puzzles/level_a/data.json'
const puz = json.problems[0] as Puzzle
///////////////////////////////

export default function PuzzlePage() {
  const hist = useRecoilValue(moveHistory)
  // const [future, setFuture] = useRecoilState(moveFuture)
  const screen = useRecoilState(screenVal)
  
  const [level, id] = puz.id.split('_')
  
  return (
    <div id="calc">
      <div className="above">
        <Goals stars={puz.stars}/>
      </div>
      <div className="body">
        <div className="screen">
          {screen}
        </div>
        <div className="functions">
          <OpBtn info={puz.operations[0]}/>
          <OpBtn info={puz.operations[1]}/>
        </div>
        <div className="controls">
          <button className='ctrl-btn' >Undo</button>
          <button className='ctrl-btn' >Redo</button>
          <button className='ctrl-btn' >Reset</button>
        </div>
      </div>
      <div className="below">
        <div className="left">
          Puzzle {level}{id} by {puz.creator}
        </div>
        <div className="right">
          Moves Made: {hist.length}
        </div>
      </div>
    </div>
  )
}