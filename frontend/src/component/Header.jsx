
import { useContext } from 'react'
import {  useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'


const Header = () => {
  const {userData}=useContext(AppContext)
 
 
  const navigate=useNavigate()
 
  return (
    <div className='flex flex-col items-center text-center text-gray-800 mt-24 justify-center [calc(100vh - 73px)]'>
       
      <div className='mt-44'>
        <h2>Hey {userData.name?userData.name:"Programmer"}</h2>
        <h2>Wellcome To Our App</h2>
        <button onClick={()=>{navigate("/login")}} className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100'>Get Started</button>
        </div>
    </div>
  )
}

export default Header