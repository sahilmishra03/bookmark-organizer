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
    const initialQuery = new URLSearchParams(window.location.search).get("q")
    if (!initialQuery) return
    queueMicrotask(() => setQuery(initialQuery))
  }, [])

  useEffect(() => {
    api.get<Folder[]>("/v1/folders").then(r => setFolders(r.data))
  }, [])

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      return
    }

    let active = true
    queueMicrotask(() => {
      if (!active) return
      setLoading(true)
      setSearched(true)
    })

    const cleanQuery = debouncedQuery.trim()

    const requests = cleanQuery.startsWith("#")
      ? [
          api.get<Bookmark[]>("/v1/search/bookmarks", {
            params: { tag: cleanQuery, search_type: "partial" },
          }),
        ]
      : [
          api.get<Bookmark[]>("/v1/search/bookmarks", {
            params: { bookmark_title: cleanQuery, search_type: "partial" },
          }),
          api.get<Bookmark[]>("/v1/search/bookmarks", {
            params: { tag: cleanQuery, search_type: "partial" },
          }),
        ]

    Promise.all(requests)
      .then(responses => {
        if (!active) return
        const merged = new Map<string, Bookmark>()
        responses.flatMap(r => r.data).forEach(bookmark => {
          merged.set(bookmark.id, bookmark)
        })
        setResults(Array.from(merged.values()))
      })
      .catch(() => {
        if (active) setResults([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [debouncedQuery])

  const folderMap = Object.fromEntries(folders.map(f => [f.id, f.name]))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Search</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">Search across all your bookmarks and tags</p>

      <input
        type="text"
        value={query}
        onChange={e => {
          const value = e.target.value
          setQuery(value)
          if (!value.trim()) {
            setResults([])
            setSearched(false)
          }
        }}
        placeholder="Search bookmarks or #tag..."
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
              tags={b.tags}
            />
          ))}
        </div>
      )}
    </div>
  )
}
