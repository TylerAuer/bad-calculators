import {useRecoilValue} from 'recoil';
import {puzzle} from '../state/puzzle';
import {userInfo} from '../state/user';
import {useParams} from 'react-router-dom';

import './Goals.scss'

const goalMap = {
  exactly: '=',
  fewer: '≤',
  more: '>'
}

interface Params {
  puz_id: string;
}


export default function Stars() {
  const puz = useRecoilValue(puzzle);
  const {progress} = useRecoilValue(userInfo);
  const {puz_id} = useParams<Params>()
  
  // Don't render until a puzzle is loaded
  if (!puz) return null
  
  const {stars} = puz
  
  const usersCurPuzProgress = progress[puz_id]
  
  // Don't render if there is no star data
  if (!usersCurPuzProgress) return null
  

  const elems = stars.map((s, i) => {
    const hasMetGoal = !!usersCurPuzProgress[i];
    
    return (
      <div key={i} className="goal">
        <div className='goal-desc'>
          {
            s.moves && s.goalRelation ? 
            `${goalMap[s.goalRelation]}${s.moves}` 
            : '∞'
          }
        </div>
      
        <div 
          key={i} 
          className={`star-icon ${hasMetGoal ? 'star-success' : ''}`}>
            ★
        </div>
      </div>
  )})

  return (
    <div className="goal-list">
      {elems}
    </div>
  )

}