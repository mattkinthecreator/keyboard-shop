import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import KeyboardsContextProvider from './contexts/KeyboardsContext';
import Login from './components/Login/Login';
import AuthContextProvider from './contexts/AuthContext';
import BrandsContextProvider from './contexts/BrandsContext';
import Cart from './components/Cart/Cart';
import CartContextProvider from './contexts/CartContext';

const Routing = () => {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <BrandsContextProvider>
          <KeyboardsContextProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </BrowserRouter>
          </KeyboardsContextProvider>
        </BrandsContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
};

export default Routing;
