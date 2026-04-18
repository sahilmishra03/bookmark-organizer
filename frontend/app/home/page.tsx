"use client"

import { motion } from "framer-motion"
import { Bookmark, Folder, Star } from "lucide-react"
import StatCard from "@/components/home/dashboard/StatCard"
import RecentBookmarkRow from "@/components/home/dashboard/RecentBookmarkRow"

const stats = [
  { label: "Total Bookmarks", value: 24, icon: Bookmark, color: "text-neutral-600 dark:text-neutral-300", trend: [8, 10, 9, 13, 15, 18, 20, 24] },
  { label: "Folders", value: 6, icon: Folder, color: "text-neutral-600 dark:text-neutral-300", trend: [2, 2, 3, 3, 4, 4, 5, 6] },
  { label: "Favorites", value: 8, icon: Star, color: "text-neutral-600 dark:text-neutral-300", trend: [3, 3, 4, 5, 5, 6, 7, 8] },
]

const recent = [
  { title: "Next.js App Router Docs", url: "nextjs.org/docs", folder: "Dev", time: "2h ago" },
  { title: "Tailwind CSS v4 Release", url: "tailwindcss.com/blog", folder: "Design", time: "5h ago" },
  { title: "Framer Motion Examples", url: "framer.com/motion", folder: "Dev", time: "1d ago" },
  { title: "Linear — Project Management", url: "linear.app", folder: "Tools", time: "2d ago" },
  { title: "Vercel Dashboard", url: "vercel.com/dashboard", folder: "Dev", time: "3d ago" },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Dashboard</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">Overview of your bookmarks and folders</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 mb-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden"
      >
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
      >
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
          Recent Bookmarks
        </p>
        <motion.div variants={container} initial="hidden" animate="show" className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {recent.map((b) => (
            <RecentBookmarkRow key={b.title} {...b} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
