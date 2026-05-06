"use client"

import FavoriteRow from "@/components/home/favorites/FavoriteRow"
import { useDataStore } from "@/store/dataStore"
import { timeAgo, stripProtocol } from "@/lib/timeUtils"

/* ── Skeleton ─────────────────────────────── */
function SkeletonRows() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4">
          <div className="h-4 w-4 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-4 w-48 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
            <div className="h-3 w-64 rounded bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
          </div>
          <div className="h-3 w-12 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse shrink-0" />
        </div>
      ))}
    </>
  )
}

export default function FavoritesPage() {
  const { favorites, folders, isLoaded } = useDataStore()

  const loading = !isLoaded
  const folderMap = Object.fromEntries(folders.map(f => [f.id, f.name]))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Favorites</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">Bookmarks you've starred</p>

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800">
        {loading ? (
          <SkeletonRows />
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
