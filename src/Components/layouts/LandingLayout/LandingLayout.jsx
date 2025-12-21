import  { useEffect } from 'react'
import Header from '../Header'
import { Outlet, useNavigate } from 'react-router'
import Footer from '../Footer'
import { useSelector } from 'react-redux'


const LandingLayout = () => {
 const {user} = useSelector((state)=>state.auth) 
 const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role === 'student'){
      navigate('/student')
    } 
    else if(user?.role === 'teacher'){
      navigate('/teacher')
    }
  },[ navigate,user])

  return (
    <>
    <div className='bg-[#f6eff7]'>
    <Header/>
    <main className='px-36 '>
    <Outlet/>
    </main>
    <Footer/>
    </div>
    </>
  )
}

export default LandingLayout
