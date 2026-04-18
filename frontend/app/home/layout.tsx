"use client"

import Sidebar from "@/components/layout/Sidebar"
import { motion } from "framer-motion"
import { useState } from "react"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <motion.main
        initial={{ marginLeft: "220px" }}
        animate={{ marginLeft: isOpen ? "220px" : "50px" }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="min-h-screen"
      >
        {children}
      </motion.main>
    </>
  )
}
