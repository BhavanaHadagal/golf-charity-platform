import React from 'react'
import HeroSection from '../components/HeroSection'
import HowItWorksSection from '../components/HowItWorksSection'
import CharitySection from '../components/CharitySection'
import PrizeSection from '../components/PrizeSection'
import PricingSection from '../components/PricingSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen">
       <HeroSection />
       <HowItWorksSection />
       <CharitySection />
       <PrizeSection />
       <PricingSection />
       <Footer />
    </div>
  )
}

export default Home