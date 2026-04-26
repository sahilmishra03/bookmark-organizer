"use client"

import { useEffect, useState } from "react"
import FavoriteRow from "@/components/home/favorites/FavoriteRow"
import api from "@/lib/api"
import { timeAgo, stripProtocol } from "@/lib/timeUtils"
import type { Bookmark, Folder } from "@/lib/types"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Bookmark[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get<Bookmark[]>("/v1/bookmarks/favorites"),
      api.get<Folder[]>("/v1/folders"),
    ]).then(([favRes, fRes]) => {
      setFavorites(favRes.data)
      setFolders(fRes.data)
    }).finally(() => setLoading(false))
  }, [])

  const folderMap = Object.fromEntries(folders.map(f => [f.id, f.name]))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Favorites</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">Bookmarks you've starred</p>

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800">
        {loading ? (
          <p className="text-sm text-neutral-400 px-5 py-8 text-center">Loading…</p>
        ) : favorites.length === 0 ? (
          <p className="text-sm text-neutral-400 px-5 py-8 text-center">No favorites yet — star a bookmark to see it here</p>
        ) : favorites.map(b => (
          <FavoriteRow
            key={b.id}
            title={b.title}
            url={stripProtocol(b.url)}
            folder={folderMap[b.folder_id] ?? "—"}
            tags={b.tags}
            time={timeAgo(b.created_at)}
          />
        ))}
      </div>
    </div>
  )
}
