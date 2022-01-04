import React from 'react'
import './Header.css'
import Logo from '../../assets/img/image.svg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <img src={Logo} alt="Logo" className="header__logo" />
      </div>
      <div className="header__middle">
        <p>Клавиатуры</p>
        <p>Аксессуары</p>
      </div>
      <div className="header__right">
        <Link to="/login">Войти / Зарегистрироваться</Link>
      </div>
    </div>
  )
}

export default Header
