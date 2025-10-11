import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'

const MainLayout = () => {
  return (
    <>
    <div className='bg-[#f6eff7]'>
    <Header/>
    <main className='px-20 '>
    <Outlet/>
    </main>
    <Footer/>
    </div>
    </>
  )
}

export default MainLayout
