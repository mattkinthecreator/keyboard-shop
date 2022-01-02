import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './components/Admin/Admin'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import KeyboardsContextProvider from './contexts/KeyboardsContext'

const Routing = () => {
  return (
    <KeyboardsContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </KeyboardsContextProvider>
  )
}

export default Routing
