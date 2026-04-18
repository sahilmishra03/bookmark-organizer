import Container from "@/components/layout/Container"
import Hero from "@/components/landing/Hero"
import SyncDevices from "@/components/landing/SyncDevices"
import BentoGrid from "@/components/landing/BentoGrid"
import Pricing from "@/components/landing/Pricing"
import CTA from "@/components/landing/CTA"

const page = () => {
  return (
    <div>
      <Container className='max-w-[1200px] mx-auto pb-40'>
        <Hero />
        <SyncDevices />
        <BentoGrid />
        <Pricing />
        <CTA />
      </Container>
    </div>
  )
}

export default page
