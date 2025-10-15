import Button from '../../components/ui/Button'

const FeaturesSection2 = () => {
  return (
    <section className='w-full flex justify-center'>
    <div  className='my-32 flex flex-col items-center w-[65%] space-y-2'>
      <h2 className='font-semibold text-5xl text-black'>Prepare Smarter, Score Higher</h2>
      <p className='text-center text-gray-500 text-lg '>Practice topic-wise tests, solve previous year papers, and track your progress — all in one platform. Get instant feedback, identify weak areas, improve smarter, and confidently prepare for every exam with ease.</p>
        <Button text="View Papers" className={"mt-4"}/>
    </div>
    
    </section>
  )
}

export default FeaturesSection2
