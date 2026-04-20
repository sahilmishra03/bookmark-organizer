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
  const [showAddModal, setShowAddModal] = useState(false)
  const [addForm, setAddForm] = useState({ title: "", url: "", description: "", folder_id: "" })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    Promise.all([
      api.get<BookmarkType[]>("/v1/bookmarks/allbookmarks"),
      api.get<FolderType[]>("/v1/folders"),
      api.get<BookmarkType[]>("/v1/bookmarks/favorites"),
    ]).then(([bRes, fRes, favRes]) => {
      setBookmarks(bRes.data)
      setFolders(fRes.data)
      setFavorites(favRes.data)
      if (fRes.data.length > 0) setAddForm(f => ({ ...f, folder_id: fRes.data[0].id }))
    }).finally(() => setLoading(false))
  }, [])

  const folderMap = Object.fromEntries(folders.map(f => [f.id, f.name]))

  const handleAdd = async () => {
    if (!addForm.title.trim() || !addForm.url.trim() || !addForm.folder_id) return
    setSaving(true)
    try {
      const { data } = await api.post<BookmarkType>(
        `/v1/bookmarks/folders/${addForm.folder_id}/bookmarks`,
        { title: addForm.title, url: addForm.url, description: addForm.description || null, favorite: false, folder_id: addForm.folder_id }
      )
      setBookmarks(prev => [data, ...prev])
      setShowAddModal(false)
      setAddForm(f => ({ ...f, title: "", url: "", description: "" }))
    } finally {
      setSaving(false)
    }
  }

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
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex items-center justify-between mb-8">
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
                value={addForm.folder_id}
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
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">Cancel</button>
              <button
                onClick={handleAdd}
                disabled={saving || !addForm.folder_id}
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
