import React from 'react'
import Home from './pages/Home'
import { Route,  Routes } from 'react-router-dom'
import Login from './pages/Login'
import ResetPassword  from './pages/ResetPassword'
import EmailVerify from './pages/EmailVerify'
import ForgotPass from './pages/ForgotPass'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-pass' element={<ForgotPass/>}/>
      <Route path='/email-verify' element={<EmailVerify/>}/>
      <Route path='/reset-pass' element={<ResetPassword/>}/>
  
    </Routes>
  )
}

export default App