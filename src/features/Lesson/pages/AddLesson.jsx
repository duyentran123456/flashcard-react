import React from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../../components/Header'
import LessonForm from '../components/LessonForm'

import { addLesson } from '../../../firebase/lesson'

const initialValues = {
  title: '',
  cards: [],
}

function AddLesson() {  

  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    const res = await addLesson(values);
    navigate(`/lesson/${res.id}`)
  }

  return (
    <>
      <Header />
      <div className='main-content-container'>
        <h1>Add Lesson</h1>
        <LessonForm 
          onSubmit={handleSubmit} 
          initialValues={initialValues}
          isAddMode={true}
        />
      </div>
    </>
  )
}

export default AddLesson