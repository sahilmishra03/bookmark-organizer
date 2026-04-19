"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Bookmark, Folder, Star } from "lucide-react"
import StatCard from "@/components/home/dashboard/StatCard"
import RecentBookmarkRow from "@/components/home/dashboard/RecentBookmarkRow"
import api from "@/lib/api"
import { buildTrend, timeAgo, stripProtocol } from "@/lib/timeUtils"
import type { Bookmark as BookmarkType, Folder as FolderType } from "@/lib/types"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])
  const [folders, setFolders] = useState<FolderType[]>([])
  const [favorites, setFavorites] = useState<BookmarkType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get<BookmarkType[]>("/v1/bookmarks/allbookmarks"),
      api.get<FolderType[]>("/v1/folders"),
      api.get<BookmarkType[]>("/v1/bookmarks/favorites"),
    ]).then(([bRes, fRes, favRes]) => {
      setBookmarks(bRes.data)
      setFolders(fRes.data)
      setFavorites(favRes.data)
    }).finally(() => setLoading(false))
  }, [])

  const folderMap = Object.fromEntries(folders.map(f => [f.id, f.name]))

  const stats = [
    {
      label: "Total Bookmarks", value: bookmarks.length, icon: Bookmark,
      color: "text-neutral-600 dark:text-neutral-300",
      trend: buildTrend(bookmarks.map(b => b.created_at)),
    },
    {
      label: "Folders", value: folders.length, icon: Folder,
      color: "text-neutral-600 dark:text-neutral-300",
      trend: buildTrend(folders.map(f => f.created_at)),
    },
    {
      label: "Favorites", value: favorites.length, icon: Star,
      color: "text-neutral-600 dark:text-neutral-300",
      trend: buildTrend(favorites.map(b => b.created_at)),
    },
  ]

  const recent = [...bookmarks]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

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
        {loading ? (
          <p className="text-sm text-neutral-400 px-5 py-8 text-center">Loading…</p>
        ) : recent.length === 0 ? (
          <p className="text-sm text-neutral-400 px-5 py-8 text-center">No bookmarks yet</p>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {recent.map((b) => (
              <RecentBookmarkRow
                key={b.id}
                title={b.title}
                url={stripProtocol(b.url)}
                folder={folderMap[b.folder_id] ?? "—"}
                time={timeAgo(b.created_at)}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
