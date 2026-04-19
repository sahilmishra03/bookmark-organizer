"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import FolderCard from "@/components/home/folders/FolderCard"
import api from "@/lib/api"
import type { Folder, Bookmark } from "@/lib/types"

const CARD_COLOR = "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"

export default function FoldersPage() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    Promise.all([
      api.get<Folder[]>("/v1/folders"),
      api.get<Bookmark[]>("/v1/bookmarks/allbookmarks"),
    ]).then(([fRes, bRes]) => {
      setFolders(fRes.data)
      setBookmarks(bRes.data)
    }).finally(() => setLoading(false))
  }, [])

  const countMap = Object.fromEntries(
    folders.map(f => [f.id, bookmarks.filter(b => b.folder_id === f.id).length])
  )

  const handleCreate = async () => {
    if (!newName.trim()) return
    setSaving(true)
    try {
      const { data } = await api.post<Folder>("/v1/folders", { name: newName.trim() })
      setFolders(prev => [...prev, data])
      setShowModal(false)
      setNewName("")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/v1/folders/${id}`)
    setFolders(prev => prev.filter(f => f.id !== id))
    setBookmarks(prev => prev.filter(b => b.folder_id !== id))
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Folders</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">Organise bookmarks into folders</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 hover:opacity-90 text-white dark:text-neutral-900 text-sm font-medium transition-opacity"
        >
          + New Folder
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-neutral-400 py-8 text-center">Loading…</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {folders.map(f => (
            <FolderCard
              key={f.id}
              name={f.name}
              count={countMap[f.id] ?? 0}
              color={CARD_COLOR}
              onClick={() => router.push(`/home/folders/${f.id}`)}
              onDelete={() => handleDelete(f.id)}
            />
          ))}
          <div
            onClick={() => setShowModal(true)}
            className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-5 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors min-h-[120px]"
          >
            <span className="text-xl text-neutral-400">+</span>
            <span className="text-sm text-neutral-400">New folder</span>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 w-full max-w-sm p-6">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-4">New Folder</h2>
            <input
              autoFocus
              placeholder="Folder name *"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreate()}
              className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
            />
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">Cancel</button>
              <button
                onClick={handleCreate}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "Creating…" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
