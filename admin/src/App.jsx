import React from 'react'
import Navbar from './components/Navbar.jsx' 
import { Routes, Route } from 'react-router-dom';
import AddItems from './components/AddItems.jsx';
import Order from './components/Order.jsx';
import List from './components/List.jsx';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<AddItems/>}/>
        <Route path='/orders' element={<Order/>}/>
        <Route path='/list' element={<List/>}/>
      </Routes>
    </>
  )
}

export default App