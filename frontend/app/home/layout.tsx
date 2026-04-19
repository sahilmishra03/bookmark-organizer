"use client"

import Sidebar from "@/components/layout/Sidebar"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setIsOpen(false)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isMobile={isMobile} />

      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-3 left-3 z-40 p-1.5 z-[999]  rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
        >
          <Menu size={18} />
        </button>
      )}

      <motion.main
        initial={{ marginLeft: "220px" }}
        animate={{ marginLeft: isMobile ? "0px" : isOpen ? "220px" : "50px" }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="min-h-screen mt-10"
      >
        {children}
      </motion.main>
    </>
  )
}
