import React from 'react'
import "../styles/navbar.css"
import logo from '../assets/ecell-white.png'

function Navbar() {
  return (
    <nav>
        <img alt="logo" src={logo}/>
        <div className='box'>Profile Pic</div>
    </nav>
  )
}

export default Navbar