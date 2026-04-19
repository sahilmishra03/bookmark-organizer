"use client"

import { useEffect, useState } from "react"
import SearchResultRow from "@/components/home/search/SearchResultRow"
import api from "@/lib/api"
import { stripProtocol } from "@/lib/timeUtils"
import type { Bookmark, Folder } from "@/lib/types"

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Bookmark[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    api.get<Folder[]>("/v1/folders").then(r => setFolders(r.data))
  }, [])

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      setSearched(false)
      return
    }
    setLoading(true)
    setSearched(true)
    api.get<Bookmark[]>("/v1/search/bookmarks", {
      params: { bookmark_title: debouncedQuery, search_type: "partial" },
    })
      .then(r => setResults(r.data))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [debouncedQuery])

  const folderMap = Object.fromEntries(folders.map(f => [f.id, f.name]))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Search</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">Search across all your bookmarks</p>

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search bookmarks..."
        className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-neutral-400 mb-2"
      />

      {searched && (
        <p className="text-xs text-neutral-400 mb-6">
          {loading ? "Searching…" : `${results.length} result${results.length === 1 ? "" : "s"}`}
        </p>
      )}

      {searched && !loading && (
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800">
          {results.length === 0 ? (
            <p className="text-sm text-neutral-400 px-5 py-8 text-center">No results found</p>
          ) : results.map(b => (
            <SearchResultRow
              key={b.id}
              title={b.title}
              url={stripProtocol(b.url)}
              folder={folderMap[b.folder_id] ?? "—"}
            />
          ))}
        </div>
      )}
    </div>
  )
}
