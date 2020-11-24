import { Star } from '../../structs/puzzle'
import './Goals.scss'

interface Props {
  stars: Star[]
}

const goalMap = {
  exactly: '=',
  fewer: '≤',
  more: '≥'
}

export default function Stars({stars}: Props) {
  const sucess = true;

  const elems = stars.map(s => {
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
      <div className={`star-group ${sucess ? 'star-success' : ''}`}>
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