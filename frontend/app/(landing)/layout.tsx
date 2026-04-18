import AppNavbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavbar />
      {children}
      <Footer />
    </>
  )
}
