import React, { useContext, useEffect } from 'react'
import {assets} from '../assets/assets.js'
import {useNavigate} from 'react-router-dom'
import AppContext from '../context/AppContext.jsx'

const Nav = () => {
  const navigate= useNavigate()
  const { userData,isLogedin}=useContext(AppContext)
  console.log(userData)
  
  return (
    <div className='w-full items-center flex justify-between p-4 sm:p-6  absolute top-0'>
        <img src={assets.logo} alt="" className='sm:w-32 w-28' />
        {isLogedin?
        <div className='flex justify-center items-center rounded-full bg-black text-slate-100 h-8 w-8 relative group'>
          {userData.name[0].toUpperCase()}
          <div className=' hidden absolute top-0 pt-10 right-0 group-hover:block  z-10'>
             <ul className=' bg-gray-100 list-none m-0 p-2 text-sm text-black '>
              <li className='flex flex-shrink-0 py-1 px-2 hover:bg-gray-200 cursor-pointer  '>Verify Email</li>
              <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Log Out</li>
             </ul>
          </div>
        </div>
     
        :
      
      
         <button onClick={()=>{navigate("/login")}} className=' border border-slate-500 rounded-full  flex items-center gap-2 px-6 py-2 hover:bg-slate-100 '>Sign In <img src={assets.arrow_icon} alt="" /> </button>
        }
         </div>
  )
}

export default Nav