import React from 'react'
import Header from '../../../components/Header'
import LessonForm from '../../../components/LessonForm'

function AddLesson() {
  return (
    <>
      <Header />
      <div className='main-content-container'>
        <h1>Add Lesson</h1>
        <LessonForm onSubmit={() => {console.log('submit')}} />
      </div>
    </>
  )
}

export default AddLesson