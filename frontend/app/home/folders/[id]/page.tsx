"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import BookmarkRow from "@/components/home/bookmarks/BookmarkRow"
import api from "@/lib/api"
import type { Bookmark, Folder } from "@/lib/types"
import { timeAgo, stripProtocol } from "@/lib/timeUtils"

type EditForm = { title: string; url: string; description: string; favorite: boolean }

export default function FolderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [folder, setFolder] = useState<Folder | null>(null)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const [editTarget, setEditTarget] = useState<Bookmark | null>(null)
  const [editForm, setEditForm] = useState<EditForm>({ title: "", url: "", description: "", favorite: false })
  const [saving, setSaving] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [addForm, setAddForm] = useState({ title: "", url: "", description: "" })

  useEffect(() => {
    Promise.all([
      api.get<Folder>(`/v1/folders/${id}`),
      api.get<Bookmark[]>(`/v1/folders/${id}/bookmarks`),
    ]).then(([fRes, bRes]) => {
      setFolder(fRes.data)
      setBookmarks(bRes.data)
    }).finally(() => setLoading(false))
  }, [id])

  const handleDelete = async (b: Bookmark) => {
    await api.delete(`/v1/bookmarks/folders/${b.folder_id}/bookmarks/${b.id}`)
    setBookmarks(prev => prev.filter(x => x.id !== b.id))
  }

  const handleToggleFavorite = async (b: Bookmark) => {
    const { data } = await api.put<Bookmark>(
      `/v1/bookmarks/folders/${b.folder_id}/bookmarks/${b.id}`,
      { title: b.title, url: b.url, description: b.description, favorite: !b.favorite }
    )
    setBookmarks(prev => prev.map(x => x.id === b.id ? data : x))
  }

  const handleAdd = async () => {
    if (!addForm.title.trim() || !addForm.url.trim()) return
    setSaving(true)
    try {
      const { data } = await api.post<Bookmark>(
        `/v1/bookmarks/folders/${id}/bookmarks`,
        { title: addForm.title, url: addForm.url, description: addForm.description || null, favorite: false, folder_id: id }
      )
      setBookmarks(prev => [data, ...prev])
      setShowAddModal(false)
      setAddForm({ title: "", url: "", description: "" })
    } finally {
      setSaving(false)
    }
  }

  const openEdit = (b: Bookmark) => {
    setEditTarget(b)
    setEditForm({ title: b.title, url: b.url, description: b.description ?? "", favorite: b.favorite })
  }

  const handleEdit = async () => {
    if (!editTarget || !editForm.title.trim() || !editForm.url.trim()) return
    setSaving(true)
    try {
      const { data } = await api.put<Bookmark>(
        `/v1/bookmarks/folders/${editTarget.folder_id}/bookmarks/${editTarget.id}`,
        { title: editForm.title, url: editForm.url, description: editForm.description || null, favorite: editForm.favorite }
      )
      setBookmarks(prev => prev.map(x => x.id === editTarget.id ? data : x))
      setEditTarget(null)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 mb-5 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to Folders
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
            {loading ? "Loading…" : (folder?.name ?? "Folder")}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            {bookmarks.length} bookmark{bookmarks.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 hover:opacity-90 text-white dark:text-neutral-900 text-sm font-medium transition-opacity"
        >
          + Add Bookmark
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-neutral-400 py-8 text-center">Loading…</p>
      ) : bookmarks.length === 0 ? (
        <p className="text-sm text-neutral-400 py-8 text-center">No bookmarks in this folder.</p>
      ) : (
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800">
          {bookmarks.map(b => (
            <BookmarkRow
              key={b.id}
              title={b.title}
              url={stripProtocol(b.url)}
              folder={folder?.name ?? ""}
              starred={b.favorite}
              time={timeAgo(b.created_at)}
              onDelete={() => handleDelete(b)}
              onEdit={() => openEdit(b)}
              onToggleFavorite={() => handleToggleFavorite(b)}
            />
          ))}
        </div>
      )}

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
              <div className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm text-neutral-500 dark:text-neutral-400">
                Folder: {folder?.name ?? "This folder"}
              </div>
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
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {editTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 w-full max-w-md p-6">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Edit Bookmark</h2>
            <div className="flex flex-col gap-3">
              <input
                autoFocus
                placeholder="Title *"
                value={editForm.title}
                onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
              <input
                placeholder="URL *"
                value={editForm.url}
                onChange={e => setEditForm(f => ({ ...f, url: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
              <input
                placeholder="Description (optional)"
                value={editForm.description}
                onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm outline-none focus:ring-2 focus:ring-neutral-400 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
              <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editForm.favorite}
                  onChange={e => setEditForm(f => ({ ...f, favorite: e.target.checked }))}
                  className="rounded"
                />
                Mark as favourite
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setEditTarget(null)} className="px-4 py-2 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">Cancel</button>
              <button
                onClick={handleEdit}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
