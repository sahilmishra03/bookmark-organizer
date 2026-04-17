"use client"
import SaveFromAnywhereCard from "@/components/ui/FeatureCard"
import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"
import { Laptop, Smartphone, Tablet, Search, Bookmark } from "lucide-react"

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

function SyncCard() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive(i => (i + 1) % DEVICES.length)
    }, 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-full p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-[rgba(40,40,40,0.70)] flex flex-col gap-4">
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          {DEVICES.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <motion.div
                animate={active === i
                  ? { scale: 1.15, borderColor: "rgb(59 130 246)" }
                  : { scale: 1, borderColor: "rgb(229 231 235)" }
                }
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-12 w-12 rounded-2xl bg-white dark:bg-neutral-800 border-2 shadow-sm flex items-center justify-center"
              >
                <Icon className={`h-5 w-5 transition-colors duration-300 ${active === i ? "text-blue-500" : "text-neutral-400"}`} />
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
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">Syncs instantly</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Save on one device, access on all of them. Zero delay.</p>
      </div>
    </div>
  )
}

function SearchCard() {
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
    <div className="h-full p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-[rgba(40,40,40,0.70)] flex flex-col gap-4">
      <div className="flex-1 flex flex-col justify-center gap-2">
        {/* Search bar */}
        <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 shadow-sm">
          <Search className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
          <span className="text-sm text-neutral-700 dark:text-neutral-200 flex-1 font-mono">
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
              className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-1.5"
            >
              <Bookmark className="h-3 w-3 text-blue-500 fill-blue-500 shrink-0" />
              <span className="text-xs text-neutral-700 dark:text-neutral-300 truncate flex-1">{r.title}</span>
              <span className="text-[10px] text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-1.5 py-0.5 rounded-full">{r.tag}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">Find anything</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Full-text search across every bookmark you've ever saved.</p>
      </div>
    </div>
  )
}

const COLLECTIONS = [
  { name: "Design Inspo", emoji: "🎨", count: 12, light: "bg-stone-300 border-stone-400", dark: "dark:bg-stone-700 dark:border-stone-500", rotate: -6, z: 0 },
  { name: "Dev Resources", emoji: "💻", count: 34, light: "bg-rose-200 border-rose-300", dark: "dark:bg-rose-900 dark:border-rose-700", rotate: 2, z: 10 },
  { name: "Reading List", emoji: "📖", count: 8, light: "bg-amber-200 border-amber-300", dark: "dark:bg-amber-900 dark:border-amber-700", rotate: 8, z: 20 },
  { name: "Tools", emoji: "🔧", count: 21, light: "bg-neutral-300 border-neutral-400", dark: "dark:bg-neutral-600 dark:border-neutral-500", rotate: -3, z: 30 },
]

function CollectionsCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="h-full p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-[rgba(40,40,40,0.70)] flex flex-col gap-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex-1 flex items-center justify-center relative">
        {/* Stacked collection cards */}
        <div className="relative w-52 h-36">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={i}
              className={`absolute inset-0 rounded-2xl border-2 ${col.light} ${col.dark} flex flex-col justify-between p-4 shadow-sm`}
              style={{ zIndex: col.z }}
              animate={hovered
                ? { rotate: col.rotate * 3, y: i * -22, x: (i - 1.5) * 18 }
                : { rotate: col.rotate * 1.8, y: i * -14, x: (i - 1.5) * 10 }
              }
              transition={{ type: "spring", stiffness: 260, damping: 22, delay: i * 0.04 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{col.emoji}</span>
                <span className="text-[10px] font-semibold text-neutral-400">{col.count} links</span>
              </div>
              <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">{col.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">Beautiful collections</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Group bookmarks into collections. Keep work, hobbies, and research separate.</p>
      </div>
    </div>
  )
}

const BentoGrid = () => {
  return (
    <div className='mt-20 md:mt-40 flex flex-col items-center gap-8 px-4 md:px-0'>
      <h1 className='text-3xl md:text-4xl font-bold'>Features</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 w-full md:h-[600px]'>
        <div className='md:row-span-2 h-[400px] md:h-auto rounded-xl overflow-hidden'>
          <SaveFromAnywhereCard />
        </div>
        <div className='md:row-span-1 h-[280px] md:h-auto rounded-xl overflow-hidden'>
          <SyncCard />
        </div>
        <div className='md:row-span-2 h-[400px] md:h-auto rounded-xl overflow-hidden'>
          <CollectionsCard />
        </div>
        <div className='md:row-span-1 h-[280px] md:h-auto rounded-xl overflow-hidden'>
          <SearchCard />
        </div>
      </div>
    </div>
  )
}

export default BentoGrid
