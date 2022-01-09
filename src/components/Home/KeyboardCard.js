import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../contexts/AuthContext';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { cartContext } from '../../contexts/CartContext';

const KeyboardCard = ({ keyboard }) => {
  const { user, toggleFavorite, favorites } = useContext(authContext);
  const { addProductToCart, checkItemInCart } = useContext(cartContext);
  const [checkInCart, setCheckInCart] = useState(checkItemInCart(keyboard.id));

  useEffect(() => {
    setCheckInCart(checkItemInCart(keyboard.id));
  }, []);

  const cartHandler = () => {
    addProductToCart(keyboard);
    setCheckInCart(checkItemInCart(keyboard.id));
  };

  const favHandler = () => {
    toggleFavorite(keyboard);
  };

  return (
    <div className="card">
      <img src={keyboard.img} alt={keyboard.name} className="card__img" />
      <h4 className="card__name">{keyboard.name}</h4>
      <div className="card__bott">
        <p className="card__price">{keyboard.price} &#8381;</p>
        {user && (
          <HeartOutlined
            onClick={favHandler}
            style={{
              fontSize: '25px',
              color: favorites.some((item) => item.name === keyboard.name)
                ? 'red'
                : 'black',
            }}
          />
        )}
        <ShoppingCartOutlined
          onClick={cartHandler}
          style={{
            backgroundColor: 'transparent',
            color: checkInCart ? '#3e5bae' : 'black',
            fontSize: '25px',
          }}
        />
      </div>
    </div>
  );
};

export default KeyboardCard;
