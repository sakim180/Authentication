import React from 'react'
import {assets} from '../assets/assets.js'
import {useNavigate} from 'react-router-dom'



const Nav = () => {
  const navigate= useNavigate()
  return (
    <div className='w-full items-center flex justify-between p-4 sm:p-6  absolute top-0'>
        <img src={assets.logo} alt="" className='sm:w-32 w-28' />
         <button onClick={()=>{navigate("/login")}} className=' border border-slate-500 rounded-full  flex items-center gap-2 px-6 py-2 hover:bg-slate-100 '>Sign In <img src={assets.arrow_icon} alt="" /> </button>
    </div>
  )
}

export default Nav