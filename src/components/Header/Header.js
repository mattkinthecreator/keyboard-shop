import React, { useContext } from 'react';
import './Header.css';
import Logo from '../../assets/img/image.svg';
import { Link } from 'react-router-dom';
import { authContext } from '../../contexts/AuthContext';
import { keyboardsContext } from '../../contexts/KeyboardsContext';

const Header = () => {
  const { user, handleLogOut, isAdmin } = useContext(authContext);
  const { getSearchKeyboards } = useContext(keyboardsContext);

  const searchHandler = (e) => {
    getSearchKeyboards(e.target.value);
  };

  return (
    <div className="header">
      <Link to="/" className="header__left">
        <img src={Logo} alt="Logo" className="header__logo" />
      </Link>
      <div className="header__middle">
        <input
          type="text"
          placeholder="Поиск по названию"
          onChange={searchHandler}
        />
        {isAdmin && <Link to="/admin">Админка</Link>}
        <Link to="/cart">Корзина</Link>
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
  );
};

export default Header;
