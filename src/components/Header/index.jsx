import React from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../Auth/Auth'

import './styles.css'

function Header(props) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("flash-card-user");
    navigate("/login");
  }

  return (
    <header>
      <div className='header-logo'>
        <a href='/' className='header-logo-link'> Quizlet </a>
      </div>
      <div className='logout'>
        <button onClick={logout}>Đăng xuất</button>
      </div>
      <Auth roles={['admin']}>
        <div className='create-lesson'>
          <a href='lesson/create-lesson' className='create-lesson-link'> Tạo bài học </a>
        </div>
      </Auth>
      <div className='header-user' role='button'>
        <img src='https://github.com/github.png' alt='avatar' />
      </div>
    </header>
  )
}

export default Header