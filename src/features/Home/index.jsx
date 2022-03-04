import React from 'react'
import Header from '../../components/Header'
import LessonItem from './LessonItem'

import './styles.css'

function Home() {
  return (
    <>
      <Header />
      <div className='main-content-container'>
        <div className='home-content'>
          <h5>Danh sách bài học</h5>
          <ul>
            <li><LessonItem title='Gadgets' description='12 thuat ngu'/></li>
            <li><LessonItem title='Animals' description='12 thuat ngu'/></li>
            <li><LessonItem title='Food' description='12 thuat ngu'/></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Home