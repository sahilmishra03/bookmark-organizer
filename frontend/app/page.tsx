import Container from "@/components/layout/Container"
import Hero from "@/components/home/Hero"
import SyncDevices from "@/components/home/SyncDevices"
import BentoGrid from "@/components/home/BentoGrid"
import Pricing from "@/components/home/Pricing"
import CTA from "@/components/home/CTA"

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
