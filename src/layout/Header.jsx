import React from 'react'
import './Header.css'
import icon from './../../src/assets/cenlineaportafolio.svg'
const Header = () => {
  return (
    <header>
      <div className="int-header">
        <h3>      <img src={icon} width="30"/>  &nbsp;  BuscaPelis</h3>
      </div>
      </header>
  )
}

export default Header