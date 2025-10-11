
import { Link } from 'react-router'
import img from '../../../assets/codeMantra.png'
import { ChevronDown, Menu } from 'lucide-react'

const Header = () => {
  return (
   <section className='flex justify-between w-full py-3 items-center font-medium text-gray-700  text-sm px-20'>
    <div className='flex gap-2'>
        <div><img className='w-10/12' src={img} alt="" /></div>
       
    </div>

    <div className=' md:flex gap-8 items-center hidden  ' >
    <div className='flex bg-white border-gray-200  gap-1 items-center border rounded-xl '>
        <input className='w-[23vw] rounded-xl   focus:ring-2 focus:ring-purple-800 outline-none p-[6px] ' type="text" placeholder='Search for education' />
        <button className='text-white h-fit py-1 hover:scale-[0.97] cursor-pointer bg-purple-600  px-3 rounded-md '> Search</button></div>

        <div className='flex items-center gap-1 cursor-pointer hover:text-purple-800 hover:font-semibold '> <p>Papers</p> <ChevronDown size={16} strokeWidth={2.6} /></div>
        <div className='flex items-center gap-1 cursor-pointer  hover:text-purple-800 hover:font-semibold'><p>Courses</p><ChevronDown size={16} strokeWidth={2.6} /> </div>
        <div className='flex items-center gap-1 cursor-pointer  hover:text-purple-800 hover:font-semibold'><p>About Us</p> <ChevronDown size={16} strokeWidth={2.6} /> </div>
        <div className='flex items-center gap-1 cursor-pointer  hover:text-purple-800 hover:font-semibold'><p>Contact Us</p><ChevronDown size={16} strokeWidth={2.6} /> </div>
    </div>
      
      <div className='flex  gap-4  items-center text-purple-800'>
     <Link to={"/signup"}>  <button className=' bg-purple-100 cursor-pointer py-1 px-4 rounded-full text-purple-800  border   hover:scale-95'>Signup</button></Link> 
      
      <Link to={"/login"}>
      <button className='bg-purple-100 cursor-pointer py-1 px-5 rounded-full   border border-purple-800 hover:scale-95'>Login</button>
      </Link>
      {/* <button></button> */}
      <button className='md:hidden block'>  <Menu /></button>
      </div>


   </section>
  )
}

export default Header
