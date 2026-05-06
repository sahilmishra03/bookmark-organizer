"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/layout/ThemeProvider'
import { Macbook } from '@/components/landing/Devices'


export default function ExtensionWaitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { theme } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Add your waitlist API logic here later
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white flex flex-col relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neutral-200/50 dark:bg-neutral-800/30 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Minimal Navigation */}
      <nav className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 relative z-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center transition-transform group-hover:scale-105">
            <img
                src={theme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg'}
                alt="logo"
                width={30}
                height={30}
              />
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">Ghostmark</span>
        </Link>
        <Link 
          href="/" 
          className="text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
        >
          Back to Home
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto w-full px-4 md:px-8 gap-16 lg:gap-24 py-12 lg:py-0 relative z-10">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:max-w-xl mt-10 lg:mt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Coming Soon
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Save links, <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-black dark:from-neutral-500 dark:to-white">
              without switching tabs.
            </span>
          </h1>
          
          <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl max-w-lg">
            We are bringing Ghostmark directly to your browser. Save, tag, and organize links instantly with our Chrome, Safari, and Firefox extensions.
          </p>

          {/* Waitlist Form */}
          <div className="w-full max-w-md mt-4">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  suppressHydrationWarning
                  className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors whitespace-nowrap"
                >
                  Join Waitlist
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                You're on the list! We'll notify you when it's ready.
              </div>
            )}
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-3 flex items-center justify-center lg:justify-start gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Right Content - Visual */}
        <div className="flex-1 flex justify-center items-center relative w-full max-w-sm lg:max-w-none">
          {/* Decorative background rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[300px] h-[300px] border border-neutral-100 dark:border-neutral-800/50 rounded-full absolute animate-[spin_20s_linear_infinite]"></div>
            <div className="w-[450px] h-[450px] border border-neutral-100 dark:border-neutral-800/50 rounded-full absolute animate-[spin_30s_linear_infinite_reverse]"></div>
          </div>
          
          {/* Visual Device: The Macbook */}
          {/* Scaled slightly smaller than the phone so the wider width fits nicely inside the rings */}
          <div className="relative z-10 scale-[0.85] md:scale-100 transform transition-transform hover:scale-[1.05] duration-500 ease-out origin-center mt-10 lg:mt-0">
             <div className="drop-shadow-2xl">
               <Macbook />
             </div>
          </div>
        </div>
        
      </div>
    </main>
  )
}