"use client"

import { motion, AnimatePresence } from "framer-motion"
import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Pen, Code2, BookOpen, Star, Wrench, Laptop, Smartphone, Tablet, Search, Bookmark } from "lucide-react"

// ---------------- SAVE FROM ANYWHERE CARD ---------------- //

const TAGS = [
  { label: "design", icon: Pen, color: "bg-pink-100 text-pink-600 border-pink-200", x: -85, y: -45, rotate: -12, delay: 0 },
  { label: "dev", icon: Code2, color: "bg-blue-100 text-blue-600 border-blue-200", x: 85, y: -55, rotate: 8, delay: 0.15 },
  { label: "read later", icon: BookOpen, color: "bg-amber-100 text-amber-600 border-amber-200", x: -75, y: 45, rotate: -6, delay: 0.3 },
  { label: "inspo", icon: Star, color: "bg-violet-100 text-violet-600 border-violet-200", x: 80, y: 40, rotate: 10, delay: 0.45 },
  { label: "tools", icon: Wrench, color: "bg-green-100 text-green-600 border-green-200", x: 0, y: -85, rotate: 3, delay: 0.6 },
]

export function SaveFromAnywhereCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <Card className="h-full flex flex-col gap-4" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Added min-h-[180px] to prevent vertical clipping */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden min-h-[180px]">
        {/* Using standard Tailwind scale classes */}
        <div className="relative flex items-center justify-center w-full h-full transform scale-90 sm:scale-100">
          
          {/* Orbiting tags */}
          {TAGS.map((tag, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-sm select-none whitespace-nowrap",
                tag.color
              )}
              animate={hovered
                ? { x: 0, y: 0, rotate: 0, scale: 0.3, opacity: 0 }
                : { x: tag.x, y: tag.y, rotate: tag.rotate, scale: 1, opacity: 1 }
              }
              transition={hovered
                ? { duration: 0.4, delay: i * 0.05, ease: "easeIn" }
                : { duration: 0.5, delay: i * 0.05, ease: "easeOut" }
              }
            >
              <tag.icon className="h-3 w-3" />
              <span>{tag.label}</span>
            </motion.div>
          ))}

          {/* Central bookmark jar */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-1"
            animate={hovered ? { scale: 1.2 } : { scale: [1, 1.04, 1] }}
            transition={hovered
              ? { duration: 0.3, ease: "easeOut" }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <div className="text-5xl sm:text-6xl select-none">🗂️</div>
            <motion.div
              className="h-1.5 w-12 sm:w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full mt-1"
              animate={hovered ? { scaleX: 1.5 } : { scaleX: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Dotted lines from tags to center */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
            {TAGS.map((tag, i) => (
              <motion.line
                key={i}
                x1={`calc(50% + ${tag.x}px)`}
                y1={`calc(50% + ${tag.y}px)`}
                x2="50%"
                y2="50%"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="text-neutral-300 dark:text-neutral-600"
                animate={hovered ? { opacity: 0 } : { opacity: [0.3, 0.7, 0.3] }}
                transition={hovered
                  ? { duration: 0.2, delay: i * 0.04 }
                  : { duration: 2.5, repeat: Infinity, delay: tag.delay, ease: "easeInOut" }
                }
              />
            ))}
          </svg>
        </div>
      </div>

      <div>
        <CardTitle>Everything, organised</CardTitle>
        <CardDescription>
          Tag, sort, and collect bookmarks your way. Find anything in seconds.
        </CardDescription>
      </div>
    </Card>
  )
}

// ---------------- COLLECTIONS CARD ---------------- //

const COLLECTIONS = [
  { name: "Design Inspo", emoji: "🎨", count: 12, light: "bg-stone-300 border-stone-400", dark: "dark:bg-stone-700 dark:border-stone-500", rotate: -6, z: 0 },
  { name: "Dev Resources", emoji: "💻", count: 34, light: "bg-rose-200 border-rose-300", dark: "dark:bg-rose-900 dark:border-rose-700", rotate: 2, z: 10 },
  { name: "Reading List", emoji: "📖", count: 8, light: "bg-amber-200 border-amber-300", dark: "dark:bg-amber-900 dark:border-amber-700", rotate: 8, z: 20 },
  { name: "Tools", emoji: "🔧", count: 21, light: "bg-neutral-300 border-neutral-400", dark: "dark:bg-neutral-600 dark:border-neutral-500", rotate: -3, z: 30 },
]

export function CollectionsCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <Card onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="flex flex-col gap-6">
      {/* Added min-h-[180px] to prevent vertical clipping on mobile */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden min-h-[180px]">
        
        {/* Using standard Tailwind scale-75 for safe shrinking on mobile */}
        <div className="relative w-44 h-32 sm:w-52 sm:h-36 transform scale-75 sm:scale-100">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={i}
              className={`absolute inset-0 rounded-2xl border-2 ${col.light} ${col.dark} flex flex-col justify-between p-3 sm:p-4 shadow-sm`}
              style={{ zIndex: col.z }}
              // TIGHTENED bounds: Reduced the `x` and `y` multipliers so the cards don't fly as far outward
              animate={hovered
                ? { rotate: col.rotate * 2.5, y: i * -16, x: (i - 1.5) * 12 }
                : { rotate: col.rotate * 1.5, y: i * -8, x: (i - 1.5) * 6 }
              }
              transition={{ type: "spring", stiffness: 260, damping: 22, delay: i * 0.04 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl">{col.emoji}</span>
                <span className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 bg-white/40 dark:bg-black/30 px-2 py-0.5 rounded-full">{col.count} links</span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-neutral-800 dark:text-neutral-200">{col.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <CardTitle>Beautiful collections</CardTitle>
        <CardDescription>Group bookmarks into collections. Keep work, hobbies, and research separate.</CardDescription>
      </div>
    </Card>
  )
}

// ---------------- UI HELPERS ---------------- //
export const Card = ({ className, children, onMouseEnter, onMouseLeave }: any) => (
  <div
    className={cn(
      "w-full h-full p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-[rgba(40,40,40,0.70)] bg-gray-50 group overflow-hidden",
      className
    )}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
)

export const CardTitle = ({ children, className }: any) => (
  <h3 className={cn("text-base sm:text-lg font-semibold text-gray-800 dark:text-white pb-1", className)}>
    {children}
  </h3>
)

export const CardDescription = ({ children, className }: any) => (
  <p className={cn("text-xs sm:text-sm text-neutral-500 dark:text-neutral-400", className)}>
    {children}
  </p>
)

// ---------------- SYNC & SEARCH CARDS ---------------- //

const SEARCH_RESULTS = [
  { title: "Tailwind CSS Docs", tag: "dev" },
  { title: "Figma – Components", tag: "design" },
  { title: "Linear – Issues", tag: "tools" },
]

const QUERIES = ["tai", "tailw", "tailwind"]

const DEVICES = [
  { icon: Laptop, label: "Mac" },
  { icon: Smartphone, label: "iPhone" },
  { icon: Tablet, label: "iPad" },
]

export function SyncCard() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive(i => (i + 1) % DEVICES.length)
    }, 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-[140px]">
        <div className="flex items-center gap-3 sm:gap-4">
          {DEVICES.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <motion.div
                animate={active === i
                  ? { scale: 1.15, borderColor: "rgb(59 130 246)" }
                  : { scale: 1, borderColor: "rgb(229 231 235)" }
                }
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-white dark:bg-neutral-800 border-2 shadow-sm flex items-center justify-center"
              >
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 ${active === i ? "text-blue-500" : "text-neutral-400"}`} />
              </motion.div>
              <span className="text-[10px] text-neutral-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5">
          {DEVICES.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full bg-blue-500"
              animate={{ width: active === i ? 24 : 8, opacity: active === i ? 1 : 0.3 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          ))}
        </div>
      </div>

      <div>
        <CardTitle>Syncs instantly</CardTitle>
        <CardDescription>Save on one device, access on all of them. Zero delay.</CardDescription>
      </div>
    </Card>
  )
}

export function SearchCard() {
  const [query, setQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    let charIdx = 0
    let phase: "typing" | "showing" | "clearing" = "typing"
    const current = QUERIES[QUERIES.length - 1]

    const tick = setInterval(() => {
      if (phase === "typing") {
        charIdx++
        setQuery(current.slice(0, charIdx))
        if (charIdx >= current.length) {
          phase = "showing"
          setShowResults(true)
        }
      } else if (phase === "showing") {
        charIdx++
        if (charIdx > current.length + 18) {
          phase = "clearing"
          setShowResults(false)
        }
      } else {
        setQuery("")
        charIdx = 0
        phase = "typing"
      }
    }, 100)

    return () => clearInterval(tick)
  }, [])

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex-1 flex flex-col justify-center gap-2 min-h-[140px]">
        {/* Search bar */}
        <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 shadow-sm">
          <Search className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
          <span className="text-sm text-neutral-700 dark:text-neutral-200 flex-1 font-mono truncate">
            {query}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-px h-3.5 bg-blue-500 align-middle ml-0.5"
            />
          </span>
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && SEARCH_RESULTS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.08, duration: 0.2 }}
              className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-2 sm:px-3 py-1.5"
            >
              <Bookmark className="h-3 w-3 text-blue-500 fill-blue-500 shrink-0" />
              <span className="text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300 truncate flex-1">{r.title}</span>
              <span className="text-[9px] sm:text-[10px] text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-1.5 py-0.5 rounded-full shrink-0">{r.tag}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div>
        <CardTitle>Find anything</CardTitle>
        <CardDescription>Full-text search across every bookmark you've ever saved.</CardDescription>
      </div>
    </Card>
  )
}

// ---------------- MAIN GRID ---------------- //

const BentoGrid = () => {
  return (
    <div id="features" className='mt-16 md:mt-24 flex flex-col items-center gap-8 w-full px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl md:text-4xl font-bold text-center'>Features</h1>
      
      <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 w-full md:h-[600px]'>
        
        <div className='md:row-span-2 min-h-[300px] md:min-h-0 rounded-xl overflow-hidden'>
          <SaveFromAnywhereCard />
        </div>
        
        <div className='md:row-span-1 min-h-[250px] md:min-h-0 rounded-xl overflow-hidden'>
          <SyncCard />
        </div>
        
        <div className='md:row-span-2 min-h-[300px] md:min-h-0 rounded-xl overflow-hidden'>
          <CollectionsCard />
        </div>
        
        <div className='md:row-span-1 min-h-[250px] md:min-h-0 rounded-xl overflow-hidden'>
          <SearchCard />
        </div>

      </div>
    </div>
  )
}

export default BentoGrid