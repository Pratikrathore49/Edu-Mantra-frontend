import Aside from '../../../sections/teacher/Aside'
import { Outlet } from 'react-router'

const TeacherLayout = () => {
 

  return (
    <div className='flex'>
          
          <div className='w-[15%]'><Aside/></div>
         <div className='flex-1 '>  <Outlet/></div>
      
    </div>
  )
}

export default TeacherLayout
