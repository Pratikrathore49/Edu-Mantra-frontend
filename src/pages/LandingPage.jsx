import HeroSection from '../sections/landing/HeroSection'
import FeaturesSection from '../sections/landing/FeaturesSection'
import FeaturesSection2 from '../sections/landing/FeaturesSection2'

const LandingPage = () => {
  return (
    <div className='w-full h-full bg-purple-5 '>
        <HeroSection/>
        <FeaturesSection/>
        <FeaturesSection2/>
      
    </div>
  )
}

export default LandingPage
