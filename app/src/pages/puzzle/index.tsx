import {Puzzle} from '../../../../structs/puzzle'

import Goals from './Goals'

import './index.scss'

///////////////////////////////
// Load puzzle for development
import json from '../../../../puzzles/level_a/data.json'
const puz = json.problems[0] as Puzzle
///////////////////////////////

export default function PuzzlePage() {
  const [level, id] = puz.id.split('_')
  
  return (
    <div id="calc">
      <div className="above">
        <Goals stars={puz.stars}/>
      </div>
      <div className="body">
        <div className="screen">
          23
        </div>
        <div className="functions">
          <button className='func-btn'>+8</button>
          <button className='func-btn' >+2</button>
          <button className='func-btn' >-4</button>
          <button className='func-btn' >Floor</button>
          <button className='func-btn' >Ceiling</button>
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
          Moves Made: 2
        </div>
      </div>
    </div>
  )
}