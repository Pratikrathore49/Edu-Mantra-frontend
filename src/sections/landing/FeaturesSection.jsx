import React from 'react'
import studyStu from '../../assets/images/studentTable.png'
import Button from '../../Components/Ui/Button'

const FeaturesSection = () => {
  return (
   <section className='flex mt-24 gap-6'>
    <div className='flex-1'><img src={studyStu} alt="" /></div>
    <div className='flex-1 space-y-8 flex flex-col items-center self-center' >
      <h2 className='font-semibold text-5xl text-black text-center'>Learn, Practice, and Succeed</h2>
     <p className='text-center text-gray-500 text-xl' >Our platform is designed to help students prepare for exams efficiently and confidently. It provides comprehensive study material, practice tests, previous year papers, and interactive learning resources — all in one place. Whether you want to strengthen your concepts, practice topic-wise tests, or evaluate your performance, our tools make learning easier and more effective. With personalized insights and a structured approach, students can track their progress, identify weak areas, and stay ahead in their preparation. Our goal is to make education accessible, organized, and engaging for every learner.</p>
     <Button text='Learn More' className={" w-[70%]"}/>

    </div>
   </section>

  )
}

export default FeaturesSection
