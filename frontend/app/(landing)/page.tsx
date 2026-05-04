import Container from "@/components/layout/Container"
import Hero from "@/components/landing/Hero"
import SyncDevices from "@/components/landing/SyncDevices"
import BentoGrid from "@/components/landing/BentoGrid"
import CTA from "@/components/landing/CTA"
import Demo from "@/components/landing/Demo"
import Upcoming from "@/components/landing/Upcoming"

const page = () => {
  return (
    // Added overflow-x-hidden and w-full to prevent horizontal scrolling
    <div className="overflow-x-hidden w-full relative">
      <Container className='max-w-[1200px] mx-auto pb-24 md:pb-40 px-4 sm:px-6 md:px-8'>
        <Hero />
        <SyncDevices />
        <BentoGrid />
        <Demo/>
        <Upcoming/>
        <CTA />
      </Container>
    </div>
  )
}

export default page