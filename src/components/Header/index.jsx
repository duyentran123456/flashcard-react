import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
        <Link to='/' className='header-logo-link'> Flash Card </Link>
      </div>
      <div className='logout'>
        <button onClick={logout}>Đăng xuất</button>
      </div>
      <Auth roles={['admin']}>
        <div className='create-lesson'>
          <Link  to='/lesson/create-lesson' className='create-lesson-link'> Tạo bài học </Link>
        </div>
      </Auth>
      <div className='header-user' role='button'>
        <img src='https://github.com/github.png' alt='avatar' />
      </div>
    </header>
  )
}

export default Header