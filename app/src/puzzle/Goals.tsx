import {useRecoilValue} from 'recoil';
import {puzzle} from '../state/puzzle';
import {userInfo} from '../state/user';
import {useParams} from 'react-router-dom';

import './Goals.scss'

const goalMap = {
  exactly: '=',
  fewer: '≤',
  more: '≥'
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
  
  const usersGoalStatus = usersCurPuzProgress.stars
  

  const elems = stars.map(s => {
    const starVal = s.value.toString()
    const hasMetGoal = usersGoalStatus[starVal]

    const stars = []
    for (let i = 0; i < s.value ; i++ ) {
      stars.push(<span key={i} className='star-icon'>★</span>)
    }
    
    return (<div key={s.value} className="goal">
      <div className='goal-value'>
        {
          s.moves && s.goalRelation ? 
          `${goalMap[s.goalRelation]}${s.moves}` 
          : '∞'}
      </div>
      <div className={`star-group ${hasMetGoal ? 'star-success' : ''}`}>
        {stars}
      </div>
    </div>
  )})

  return (
    <div className="goal-list">
      {elems}
    </div>
  )

}