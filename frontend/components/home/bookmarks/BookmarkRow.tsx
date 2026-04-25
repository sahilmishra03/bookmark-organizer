"use client"

import { Trash2, Pencil } from "lucide-react"
import { LinkPreview } from "@/components/ui/link-preview"

interface BookmarkRowProps {
  title: string
  url: string
  folder: string
  tags?: string[]
  starred: boolean
  time: string
  onDelete?: () => void
  onEdit?: () => void
  onToggleFavorite?: () => void
}

export default function BookmarkRow({ title, url, folder, tags = [], starred, time, onDelete, onEdit, onToggleFavorite }: BookmarkRowProps) {
  return (
    <div className="flex items-center justify-between px-5 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleFavorite}
          className={`text-sm shrink-0 transition-colors ${starred ? "text-yellow-400" : "text-neutral-300 dark:text-neutral-600 hover:text-yellow-400"}`}
        >
          {starred ? "★" : "☆"}
        </button>
        <div className="min-w-0">
          <LinkPreview
            url={`https://${url}`}
            className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
          >
            {title}
          </LinkPreview>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <p className="text-xs text-neutral-400 truncate">{url}</p>
            {tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-3">
        <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
          {folder}
        </span>
        <span className="text-xs text-neutral-400">{time}</span>
        {onEdit && (
          <button
            onClick={onEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <Pencil size={14} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-red-500"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
