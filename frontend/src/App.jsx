import React from 'react'
import Home from './pages/Home'
import { Route,  Routes } from 'react-router-dom'
import Login from './pages/Login'
import ResetPassword  from './pages/ResetPassword'
import EmailVerify from './pages/EmailVerify'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/email-verify' element={<EmailVerify/>}/>
  
    </Routes>
  )
}

export default App