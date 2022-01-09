import React, { useContext } from 'react';
import { InputNumber, Button } from 'antd';
import { cartContext } from '../../contexts/CartContext';

const CartItem = ({ item }) => {
  const { deleteFromCart, changeProductCount } = useContext(cartContext);

  const countHandle = (value) => {
    changeProductCount(value, item.item.id);
  };

  console.log(item);

  return (
    <div className="cart-item">
      <div className="cart-item-header">
        <button
          className="favorite-btn"
          style={{ height: '15%' }}
          onClick={() => deleteFromCart(item.item.id)}>
          X
        </button>
      </div>
      <div className="cart-item-content">
        <img
          src={item.item.img}
          alt={item.item.name}
          style={{ height: '250px' }}
        />
        <p>{item.item.name}</p>
      </div>
      <div className="cart-item-right">
        <Button
          onClick={() => changeProductCount(item.count - 1, item.item.id)}>
          -
        </Button>
        <InputNumber value={item.count} onChange={countHandle} />
        <Button
          onClick={() => changeProductCount(item.count + 1, item.item.id)}>
          +
        </Button>
        <p>{item.subPrice} &#8381;</p>
      </div>
    </div>
  );
};

export default CartItem;
