import React, { useState } from 'react'
import { assets } from '../assets/assets';

const Login = () => {
  const [state,setState]=useState("");

  return (
    <div className='flex justify-center items-center bg-slate-100 min-h-screen rounded-md bg-gradient-to-br from-blue-200 to-purple-400'>
         <div>
        <form action="" className=' flex flex-col w-72 shadow-xl p-5 bg-white rounded-md gap-2'>
          <h1 className='text-center text-xl mb-8'>Create Account</h1>
          <div className='flex items-center gap-3 bg-[#333A5C] rounded-full px-5 py-2.5'>
            <img src={assets.person_icon} alt="" />
            <input name='fullname' className='bg-transparent outline-none rounded-full text-white' type="text" placeholder=' Name' required />

            </div>

            <div className='flex items-center gap-3 bg-[#333A5C] rounded-full px-5 py-2.5'>
            <img src={assets.mail_icon} alt="" />
            <input name='email' className='bg-transparent outline-none rounded-full text-white' type="email" placeholder=' Email' required />

            </div>

            <div className='flex items-center gap-3 bg-[#333A5C] rounded-full px-5 py-2.5'>
            <img src={assets.lock_icon} alt="" />
            <input className='bg-transparent outline-none rounded-full text-white' type="text" placeholder=' Password' required />

            </div>
            <button className='bg-blue-500 px-3 rounded-md py-2.5'>Sign Up</button>
            <p className='flex'>Already have an account? <p className='text-blue-600'>Sign In</p></p>
        </form>
       

        </div>

    


    </div>
  )
}

export default Login