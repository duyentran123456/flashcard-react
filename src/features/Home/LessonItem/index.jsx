import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

function LessonItem(props) {
  const { lesson } = props

  return (
    <div className='lesson-item'>
      <div className='lesson-content'>      
        <div className='lesson-title'>
          <h5>{lesson.title}</h5>
        </div>
        <div className='lesson-description'>
          <p>{lesson.cards.length} thuật ngữ</p>
        </div>
      </div>
      <div className='lesson-link'>
        <Link to={`/lesson/${lesson.id}`}></Link>
      </div>
    </div>
  )
}

export default LessonItem