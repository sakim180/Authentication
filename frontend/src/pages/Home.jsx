import React from 'react'
import Nav from '../component/Nav'
import Header from '../component/Header'

const Home = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
   <Nav/>
   <Header></Header>
   </div>
   </>
  )
}

export default Home