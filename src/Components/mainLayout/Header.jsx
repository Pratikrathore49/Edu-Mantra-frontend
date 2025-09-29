import React from 'react'
import img from '../../assets/CodeMantra.png'
import { ChevronDown } from 'lucide-react'

const Header = () => {
  return (
   <section className='flex justify-between w-full py-2 items-center font-medium text-gray-700  text-sm px-14'>
    <div className='flex gap-2'>
        <div><img className='w-3/4' src={img} alt="" /></div>
       
    </div>
    <div className='flex gap-8 items-center' >
      <input className='border w-[23vw] border-gray-200 rounded-full  outline-none p-[6px] focus:ring-2 focus:ring-purple-800' type="text" placeholder='Search for education' />

        <div className='flex items-center gap-1 cursor-pointer hover:text-purple-800 hover:font-semibold '> <p>Papers</p> <ChevronDown size={16} strokeWidth={2.6} /></div>
        <div className='flex items-center gap-1 cursor-pointer  hover:text-purple-800 hover:font-semibold'><p>Courses</p><ChevronDown size={16} strokeWidth={2.6} /> </div>
        <div className='flex items-center gap-1 cursor-pointer  hover:text-purple-800 hover:font-semibold'><p>About Us</p> <ChevronDown size={16} strokeWidth={2.6} /> </div>
        <div className='flex items-center gap-1 cursor-pointer  hover:text-purple-800 hover:font-semibold'><p>Contact Us</p><ChevronDown size={16} strokeWidth={2.6} /> </div>
    </div>
      
      <div className='flex  gap-4 '>
      <button className=' bg-purple-100 cursor-pointer py-1 px-4 rounded-full text-purple-800  border border-purple-800  hover:scale-95'>Signup</button>
      <button className='bg-purple-100 cursor-pointer py-1 px-5 rounded-full text-purple-800  border border-purple-800 hover:scale-95'>Login</button>
      {/* <button></button> */}
      </div>

   </section>
  )
}

export default Header
