import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Tooltip, Space, Typography } from 'antd';
import { Modal, Button, List } from 'antd';
import 'antd/dist/antd.css';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { cartContext } from '../../contexts/CartContext';

const Cart = () => {
  const [newUser, setNewUser] = useState({
    username: '',
    provinсe: '',
    street: '',
    email: '',
  });

  function handleValues(e) {
    let values = {
      ...newUser,
      [e.target.name]: e.target.value,
    };
    setNewUser(values);
  }

  function checkValues() {
    if (
      !newUser.username ||
      !newUser.provinсe ||
      !newUser.street ||
      !newUser.email
    ) {
      alert('Пожалуйста, заполните все поля!');
      return;
    } else {
      localStorage.setItem('Cartinfo', JSON.stringify(newUser));
      console.log(newUser);
    }
    setIsModalVisible(false);
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { getCart, cart } = useContext(cartContext);
  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="favorite-container">
      <List
        style={{ marginTop: '50px' }}
        itemLayout="vertical"
        size="large"
        dataSource={cart?.products}
        footer={
          <h2 style={{ color: '#7CFC00', fontSize: '25px' }}>
            Итого: {cart?.totalPrice}&#8381;
          </h2>
        }
        renderItem={(item) => <CartItem item={item} />}
      />
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100px',
          }}>
          {cart.totalPrice === 0 ? null : (
            <Link to="/credit-card">
              <button className="cart-btn">Buy</button>
            </Link>
          )}
        </div>
      </>
    </div>
  );
};

export default Cart;
