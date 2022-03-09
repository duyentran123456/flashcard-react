import React, { useEffect } from 'react'
import Header from '../../components/Header'
import LessonItem from './LessonItem'

import { getAllLessons } from '../../firebase/lesson'
import Auth from '../../components/Auth/Auth';

import './styles.css'

function Home() {
  const [lessons, setLessons] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllLessons()
      setLessons(response)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <Auth roles={['user', 'admin']}>
      <Header />
      {isLoading ? <div>Loading...</div> :
        <div className='main-content-container'>
          <div className='home-content'>
            <h5>Danh sách bài học</h5>
            <ul>
              {lessons.map((lesson) => {
                return (
                  <LessonItem key={lesson.id} lesson={lesson} />
                )
              })}
            </ul>
          </div>
        </div>
      }
    </ Auth>
  )
}

export default Home