import React, { useContext } from 'react'
import './Header.css'
import Logo from '../../assets/img/image.svg'
import { Link } from 'react-router-dom'
import { authContext } from '../../contexts/AuthContext'

const Header = () => {
  const { user, handleLogOut, isAdmin } = useContext(authContext)

  return (
    <div className="header">
      <div className="header__left">
        <img src={Logo} alt="Logo" className="header__logo" />
      </div>
      <div className="header__middle">
        <p>Клавиатуры</p>
        <p>Аксессуары</p>
        {isAdmin && <Link to="/admin">Админка</Link>}
      </div>
      <div className="header__right">
        {user ? (
          <>
            <p>{user.email}</p>
            <button onClick={handleLogOut}>Log Out</button>
          </>
        ) : (
          <Link to="/login">Войти / Зарегистрироваться</Link>
        )}
      </div>
    </div>
  )
}

export default Header
