"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "@/components/layout/ThemeProvider"
import { Sun, Moon, RefreshCw, Server } from "lucide-react"

export default function MaintenancePage() {
    const { theme, setTheme } = useTheme()
    const [isRefreshing, setIsRefreshing] = useState(false)

    const logoSrc = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"

    const handleRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            window.location.reload()
        }, 600)
    }

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-white relative overflow-hidden transition-colors duration-300">
            {/* Subtle dotted pattern background */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-neutral-200/40 dark:bg-neutral-900/40 blur-[150px] rounded-full pointer-events-none -z-10" />

            {/* Top Bar */}
            <header className="w-full max-w-[1200px] mx-auto px-6 py-6 flex items-center justify-between z-10">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="h-9 w-9 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                        <img src={logoSrc} alt="Ghostmark Logo" width={22} height={22} />
                    </div>
                    <span className="font-semibold tracking-tight text-lg text-neutral-900 dark:text-white">
                        Ghostmark
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 transition-colors"
                        aria-label="Toggle theme"
                    >
                        <Sun size={18} className="hidden dark:block" />
                        <Moon size={18} className="block dark:hidden" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-12 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="max-w-md w-full bg-white dark:bg-[#111111] border-2 border-dotted border-neutral-300 dark:border-neutral-600 rounded-2xl p-8 sm:p-10 shadow-lg dark:shadow-2xl relative text-center flex flex-col items-center"
                >
                    {/* Professional Status Pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium mb-6">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        UNDER MAINTENANCE
                    </div>

                    {/* Minimal Server Icon */}
                    <div className="w-12 h-12 mb-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 shadow-sm">
                        <Server size={22} />
                    </div>

                    {/* Headings */}
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-3">
                        We&apos;ll Be Right Back
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 max-w-xs">
                        The Render backend server is currently experiencing a temporary issue. I am actively working to resolve it and restore service shortly.
                    </p>

                    {/* Clean Action Button */}
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="w-full sm:w-auto min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-70 cursor-pointer shadow-sm"
                    >
                        <RefreshCw size={15} className={isRefreshing ? "animate-spin" : ""} />
                        <span>{isRefreshing ? "Checking..." : "Try Again"}</span>
                    </button>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="w-full max-w-[1200px] mx-auto px-6 py-6 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400 z-10">
                <p>© {new Date().getFullYear()} Ghostmark. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/sahilmishra03/Ghostmark"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                        GitHub Repository
                    </a>
                </div>
            </footer>
        </div>
    )
}
