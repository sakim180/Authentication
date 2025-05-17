import React, { useContext, useEffect } from 'react'
import {assets} from '../assets/assets.js'
import {useNavigate} from 'react-router-dom'
import AppContext from '../context/AppContext.jsx'

const Nav = () => {
  const navigate= useNavigate()
  const { userData,isLogedin,logout,sendOtp}=useContext(AppContext)
 const  otphandaler=async()=>{
  await sendOtp()
  navigate("/email-verify")



 }
  
  return (
    <div className='w-full items-center flex justify-between p-4 sm:p-6  absolute top-0'>
        <img src={assets.logo} alt="" className='sm:w-32 w-28' />
        {userData?
        <div className='flex justify-center items-center rounded-full bg-black text-slate-100 h-8 w-8 relative group'>
          {userData.name[0].toUpperCase()}
          <div className="relative group">
          <div className="relative group">
  <div className="hidden absolute top-full right-0 mt-2 w-28 group-hover:block z-20 transition-all duration-200">
    <ul className="bg-white rounded-md shadow-lg ring-1 ring-gray-200 text-sm text-gray-700">
      {userData.isAccountVerify ?"": <li onClick={()=>{otphandaler()}} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150">
        
        Verify Email
      </li>}
     
      <li onClick={()=>logout()} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150">
        Log Out
      </li>
    </ul>
  </div>
</div>

</div>

        </div>
     
        :
      
      
         <button onClick={()=>{navigate("/login")}} className=' border border-slate-500 rounded-full  flex items-center gap-2 px-6 py-2 hover:bg-slate-100 '>Sign In <img src={assets.arrow_icon} alt="" /> </button>
        }
         </div>
  )
}

export default Nav