import {useParams, useHistory} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {level} from '../state/level';
import {userInfo} from '../state/user';
import useLoadLevel from '../hooks/useLoadLevel'

import './index.scss'

interface Params {
  level_id: string;
}


export default function LevelPage() {
  const lvl = useRecoilValue(level)
  const {progress} = useRecoilValue(userInfo)
  const {level_id} = useParams<Params>() 
  const history = useHistory()
  
  // Load level if needed
  useLoadLevel(level_id)

  // Don't rended HTML until level info is loaded
  if (!lvl || level_id !== lvl.id.toString()) return null

  const onPuzClick = (id: number): void => {
    history.push(`/puzzle/${id}`)
  }
  
  const onLvlClick = (id: number): void => {
    history.push(`/level/${id}`)
  }

  // Make stars that site below puzzle buttons
  const puzList = lvl.puzIndexes.map(({id, stars}, i) => {
    const starsEarnedByUser = progress[id]?.filter(i => i).length || 0;
    const starsForPuz = stars.length;

    const starList: JSX.Element[] = []

    // Generate list of stars with classes based on whether the stars have 
    // been earned or not
    for (let i = 0; i < starsForPuz; i++) {
      if (i < starsEarnedByUser) {
        starList.push(<span key={i} className='lvl-page__star lvl-page__star--earned'>★</span>)
      } else {
        starList.push(<span key={i} className='lvl-page__star'>★</span>)
      }
    }

    return (
      <div key={i} className='lvl-page__puz-and-star-wrapper'>
        <button 
          className='lvl-page__puzzle-btn' 
          onClick={() => onPuzClick(id)}>
            {i+1}
        </button>
        <div className='lvl-page__stars'>{starList}</div>
      </div>
    )
  });

  return (
    <div className="lvl-page">
      <div className="lvl-page__header">
        <div className="lvl-page__title">Level {lvl.id}</div>
        <div className="lvl-page__desc">{lvl.desc}</div>
      </div>
      <div className="lvl-page__list-of-puzzles">
        {puzList}
      </div>
      <div className="lvl-page__nav">
        <div className="lvl-page__left">
            {lvl.levelBelow && (
              <button className='lvl-page__level-btn' onClick={() => onLvlClick(lvl.levelBelow as number)}>
                Level {lvl.levelBelow}
              </button>
            )}
        </div>
        <div className="lvl-page__mid">
          
        </div>
        <div className="lvl-page__right">
            {lvl.levelAbove && (
              <button className='lvl-page__level-btn' onClick={() => onLvlClick(lvl.levelAbove as number)}>
                Level {lvl.levelAbove}
              </button>
            )}
        </div>
      </div>
    </div>
  )
}