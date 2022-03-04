import React from 'react'

import './styles.css'

function LessonItem(props) {
  return (
    <div className='lesson-item'>
      <div className='lesson-content'>      
        <div className='lesson-title'>
          <h5>{props.title}</h5>
        </div>
        <div className='lesson-description'>
          <p>{props.description}</p>
        </div>
      </div>
      <div className='lesson-link'>
        <a href='/lesson/123'></a>
      </div>
    </div>
  )
}

export default LessonItem