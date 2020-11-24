import * as React from 'react';

import './index.scss'

export default function Puzzle() {
  return (
    <div id="calc">
      <div className="above">
        <div className="left">
          Level 1
        </div>
        <div className="right">
          {"* =3 ** <=5 ** <=8"}
        </div>
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
        </div>
        <div className="right">
          Moves Made: 2
        </div>
      </div>
    </div>
  )
}