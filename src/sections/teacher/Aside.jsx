
import { FaHome } from 'react-icons/fa'
import { GiPaperBagOpen } from 'react-icons/gi'
import { IoMdAddCircle } from 'react-icons/io'
import { NavLink } from 'react-router'

// {       text:'Question',path:'/teacher/Questions',icon: }
const Aside = () => {
    const list = [{text:"Home",path:"/teacher",icon:<FaHome />},{text:'AddQuestion',path:"/teacher/addQuestion" , icon:<IoMdAddCircle />},{text:'Paper',path:'/teacher/paper',icon:<GiPaperBagOpen />}
        
    ]
  return (
  <section className='bg-purple-800 text-white min-h-screen'>
     
     <div className='flex flex-col gap-2'>
        {list.map((item)=>
       
      <div className='flex items-center gap-2 text-lg hover:border-l-4 p-2' > 
      <span>{item.icon}</span> <NavLink to={item.path}>{item.text}</NavLink>
      
      </div>
      )}

     </div>
  </section>
  )
}

export default Aside
