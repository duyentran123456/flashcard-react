import React from 'react'

import './styles.css'

function Header() {
  return (
    <header>
      <div className='header-logo'>
        <a href='/' className='header-logo-link'> Quizlet </a>
      </div>
      <div className='header-user' role='button'>
        <img src='https://github.com/github.png' alt='avatar' />
      </div>
    </header>
  )
}

export default Header