
import { FaHome, FaQuestionCircle } from 'react-icons/fa'
import { GiPaperBagOpen } from 'react-icons/gi'
import { IoMdAddCircle } from 'react-icons/io'
import { NavLink } from 'react-router'


const Aside = () => {
    const list = [{text:"Home",path:"/teacher",icon:<FaHome />},{text:'AddQuestion',path:"/teacher/addQuestion" , icon:<IoMdAddCircle />},{text:'Papers',path:'/teacher/papers',icon:<GiPaperBagOpen />},{text:'Questions',path:'/teacher/questions',icon:<FaQuestionCircle /> }
      ,{
        text:'AddPaper',path:'/teacher/addPaper',icon:"+"
      }
        
    ]
  return (
  <section className='bg-purple-800 text-white min-h-screen h-full'>
     
     <div className='flex flex-col gap-2'>
        {list.map((item,idx)=>
       
      <div key={idx} className='flex items-center gap-2 text-lg hover:border-l-4 p-2' > 
      <span>{item.icon}</span> <NavLink to={item.path}>{item.text}</NavLink>
      
      </div>
      )}

     </div>
  </section>
  )
}

export default Aside
