"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const Hero = () => {
    return (
        <section className="relative pt-12 md:pt-20 pb-4 md:pb-8 flex flex-col items-start gap-6 overflow-visible">
            {/* Ambient glow */}
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-neutral-300/20 dark:bg-neutral-700/15 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Heading */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.08] text-neutral-900 dark:text-white z-10"
            >
                Save anything.
                <br />
                <span className="text-neutral-400 dark:text-neutral-500">
                    Find it everywhere.
                </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-neutral-500 dark:text-neutral-400 max-w-lg text-base md:text-lg leading-relaxed z-10"
            >
                Your bookmarks, synced across every device the moment you save them.
                No more lost links—<em className="not-italic font-medium text-neutral-700 dark:text-neutral-300">without</em> digging through browser folders.
            </motion.p>

            {/* CTAs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-wrap gap-3 items-center z-10"
            >
                <Link
                    href="/login"
                    className="
                        inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold
                        bg-neutral-900 text-white
                        dark:bg-white dark:text-neutral-900
                        hover:bg-neutral-800 dark:hover:bg-neutral-200
                        border border-neutral-800 dark:border-neutral-300
                        shadow-sm
                        transition-all duration-200
                    "
                >
                    Get started free
                </Link>
                <Link
                    href="#features"
                    className="
                        inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold
                        text-neutral-700 dark:text-neutral-300
                        border border-neutral-300 dark:border-neutral-700
                        hover:bg-neutral-100 dark:hover:bg-neutral-800
                        transition-all duration-200
                    "
                >
                    See how it works
                </Link>
            </motion.div>

            {/* Product Screenshot — Detailed Safari Dark Mode UI */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-full mt-10 md:mt-16 z-10"
            >
                {/* Soft Glow behind the flat image */}
                <div className="absolute -inset-2 bg-gradient-to-b from-neutral-200/50 to-transparent dark:from-neutral-800/50 dark:to-transparent rounded-[2rem] blur-xl -z-10" />

                {/* Main screenshot window */}
                <div className="relative rounded-2xl overflow-hidden border border-[#2d2d2d] shadow-2xl dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">

                    {/* Authentic Safari Dark Mode Header */}
                    <div className="relative flex items-center justify-between gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#1e1e1e] border-b border-[#2d2d2d]">
                        
                        {/* Left Section: Traffic Lights & Navigation */}
                        <div className="flex items-center gap-4 sm:gap-5 shrink-0 z-10">
                            {/* Traffic Lights */}
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
                            </div>

                            {/* Nav Icons */}
                            <div className="hidden sm:flex items-center gap-5 text-[#8a8a8a]">
                                {/* Sidebar toggle */}
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-[#d1d1d1] transition-colors"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                                
                                {/* Back & Forward Group */}
                                <div className="flex items-center gap-3">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-[#d1d1d1] transition-colors"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </div>
                            </div>
                        </div>

                        {/* Center Section: URL Bar Area 
                            MOBILE: flex-1 so it safely shrinks between the icons.
                            DESKTOP: md:absolute md:left-1/2 so it strictly centers in the window. 
                        */}
                        <div className="flex-1 md:flex-initial flex items-center justify-center min-w-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-[420px]">
                            
                            <div className="flex items-center justify-center gap-2.5 w-full">
                                {/* Shield Icon - OUTSIDE the box */}
                                <svg className="hidden sm:block shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>

                                {/* URL Box */}
                                <div className="flex-1 flex items-center justify-between h-[24px] sm:h-[28px] px-2.5 bg-[#282828] border border-[#333333] rounded-md shadow-inner min-w-0">
                                    {/* Invisible spacer to perfectly center the text against the reload icon */}
                                    <div className="w-3 shrink-0 hidden sm:block"></div>

                                    {/* URL text */}
                                    <span className="flex-1 text-center text-[10.5px] sm:text-[12.5px] text-[#d1d1d1] font-medium tracking-wide truncate px-1">ghostmark.sahilmishra.dev</span>

                                    {/* Refresh Icon - INSIDE the box at the end */}
                                    <svg className="shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><polyline points="21 3 21 8 16 8"></polyline></svg>
                                </div>
                            </div>

                        </div>

                        {/* Right Section: Action Icons */}
                        <div className="hidden sm:flex items-center justify-end gap-4 text-[#8a8a8a] shrink-0 z-10">
                            {/* Download */}
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-[#d1d1d1] transition-colors"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            {/* Share */}
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-[#d1d1d1] transition-colors"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                            {/* Plus */}
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-[#d1d1d1] transition-colors"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            {/* Tabs */}
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hover:text-[#d1d1d1] transition-colors"><rect x="2" y="2" width="14" height="14" rx="2" ry="2"></rect><rect x="8" y="8" width="14" height="14" rx="2" ry="2"></rect></svg>
                        </div>
                    </div>

                    {/* Screenshot */}
                    <div className="relative w-full border-t border-black/10 dark:border-white/5">
                        <img
                            src="/dashboard.png"
                            alt="Ghostmark dashboard — bookmark organizer"
                            className="w-full h-auto block bg-white dark:bg-[#0a0a0a]"
                            loading="eager"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero