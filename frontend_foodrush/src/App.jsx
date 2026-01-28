import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage/AboutPage'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import ContactPage from './pages/ContactPage/ContactPage'
import SignUp from './components/SignUp/SignUp'
import PrivetRout from './components/PivetRoute/PrivetRout'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/menu' element={<Menu/>}/>

      <Route path='/login' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>

      <Route path='/cart' element={
        <PrivetRout>
          <Cart/>
        </PrivetRout>
      }/>
    </Routes>
  )
}

export default App
