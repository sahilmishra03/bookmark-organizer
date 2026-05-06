"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Bookmark, Folder, Hash, Star } from "lucide-react"
import StatCard from "@/components/home/dashboard/StatCard"
import RecentBookmarkRow from "@/components/home/dashboard/RecentBookmarkRow"
import api from "@/lib/api"
import { useDataStore } from "@/store/dataStore"
import { buildRealTrend, generateMockTrend, timeAgo, stripProtocol } from "@/lib/timeUtils"
import { parseTagInput } from "@/lib/utils"
import type { Bookmark as BookmarkType } from "@/lib/types"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

/* ── Skeleton helpers ─────────────────────────────── */
function SkeletonStatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mb-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`p-5 flex flex-col gap-3 ${i < 2 ? "border-b sm:border-b-0 sm:border-r border-neutral-200 dark:border-neutral-800" : ""}`}
        >
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
            <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
          </div>
          <div className="h-7 w-16 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
          <div className="h-10 w-full rounded bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

function SkeletonBookmarkRows() {
  return (
    <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4">
          <div className="h-4 w-4 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-4 w-48 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
            <div className="h-3 w-64 rounded bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
          </div>
          <div className="h-3 w-12 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse shrink-0" />
        </div>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const { bookmarks, folders, favorites, isLoaded } = useDataStore()
  const addBookmarkToStore = useDataStore((s) => s.addBookmark)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showAllTags, setShowAllTags] = useState(false)
  const [addForm, setAddForm] = useState({ title: "", url: "", description: "", folder_id: "", tags: "" })
  const [saving, setSaving] = useState(false)

  const folderMap = Object.fromEntries(folders.map(f => [f.id, f.name]))

  const handleAdd = async () => {
    const folderId = addForm.folder_id || (folders.length > 0 ? folders[0].id : "")
    if (!addForm.title.trim() || !addForm.url.trim() || !folderId) return
    setSaving(true)
    try {
      const { data } = await api.post<BookmarkType>(
        `/v1/bookmarks/folders/${folderId}/bookmarks`,
        { title: addForm.title, url: addForm.url, description: addForm.description || null, favorite: false, folder_id: folderId, tags: parseTagInput(addForm.tags) }
      )
      addBookmarkToStore(data)
      setShowAddModal(false)
      setAddForm(f => ({ ...f, title: "", url: "", description: "", tags: "" }))
    } finally {
      setSaving(false)
    }
  }

  const stats = [
    {
      label: "Total Bookmarks", value: bookmarks.length, icon: Bookmark,
      color: "text-neutral-600 dark:text-neutral-300",
      trend: bookmarks.length > 0 ? buildRealTrend(bookmarks.map(b => b.created_at)) : generateMockTrend(bookmarks.length, 0.4),
    },
    {
      label: "Folders", value: folders.length, icon: Folder,
      color: "text-neutral-600 dark:text-neutral-300",
      trend: folders.length > 0 ? buildRealTrend(folders.map(f => f.created_at)) : generateMockTrend(folders.length, 0.3),
    },
    {
      label: "Favorites", value: favorites.length, icon: Star,
      color: "text-neutral-600 dark:text-neutral-300",
      trend: favorites.length > 0 ? buildRealTrend(favorites.map(b => b.created_at)) : generateMockTrend(favorites.length, 0.5),
    },
  ]

  const recent = [...bookmarks]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  const latestTags = [...bookmarks]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .flatMap(bookmark => bookmark.tags)
    .filter((tag, index, tags) => tags.indexOf(tag) === index)

  const visibleTags = showAllTags ? latestTags : latestTags.slice(0, 3)

  const loading = !isLoaded

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Dashboard</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">Overview of your bookmarks and folders</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 hover:opacity-90 text-white dark:text-neutral-900 text-sm font-medium transition-opacity"
        >
          + Add Bookmark
        </button>
      </motion.div>

      {loading ? (
        <SkeletonStatCards />
      ) : (
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
      )}

      {!loading && latestTags.length > 0 && (
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
            <Hash size={15} />
          </span>
          {visibleTags.map(tag => (
            <Link
              key={tag}
              href={`/home/search?q=${encodeURIComponent(`#${tag}`)}`}
              className="rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              #{tag}
            </Link>
          ))}
          {latestTags.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllTags(value => !value)}
              className="rounded-full bg-neutral-900 dark:bg-neutral-100 px-3 py-1 text-xs font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
            >
              {showAllTags ? "Show less" : "Show all"}
            </button>
          )}
        </motion.nav>
      )}

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
          <SkeletonBookmarkRows />
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
                tags={b.tags}
                time={timeAgo(b.created_at)}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 w-full max-w-md p-6">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Add Bookmark</h2>
            <div className="flex flex-col gap-3">
              <input
                autoFocus
                placeholder="Title *"
                value={addForm.title}
                onChange={e => setAddForm(f => ({ ...f, title: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
              <input
                placeholder="URL * (https://...)"
                value={addForm.url}
                onChange={e => setAddForm(f => ({ ...f, url: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
              <select
                value={addForm.folder_id || (folders.length > 0 ? folders[0].id : "")}
                onChange={e => setAddForm(f => ({ ...f, folder_id: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100"
              >
                {folders.length === 0 && <option value="">No folders — create one first</option>}
                {folders.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
              <input
                placeholder="Description (optional)"
                value={addForm.description}
                onChange={e => setAddForm(f => ({ ...f, description: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
              <input
                placeholder="Tags (comma separated)"
                value={addForm.tags}
                onChange={e => setAddForm(f => ({ ...f, tags: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">Cancel</button>
              <button
                onClick={handleAdd}
                disabled={saving || folders.length === 0}
                className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
