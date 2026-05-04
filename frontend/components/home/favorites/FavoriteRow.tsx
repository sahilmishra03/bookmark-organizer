"use client"

import { LinkPreview } from "@/components/ui/link-preview"

interface FavoriteRowProps {
  title: string
  url: string
  folder: string
  tags?: string[]
  time: string
}

export default function FavoriteRow({ title, url, folder, tags = [], time }: FavoriteRowProps) {
  return (
    <div className="flex items-center justify-between px-5 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
        <span className="text-sm text-yellow-500 shrink-0">★</span>
        <div className="flex-1 min-w-0">
          <LinkPreview
            url={`https://${url}`}
            className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors block truncate"
          >
            {title}
          </LinkPreview>
          <div className="mt-1 flex flex-wrap items-center gap-1.5 min-w-0">
            <p className="text-xs text-neutral-400 block max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
              {url}
            </p>
            {tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 shrink-0"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 shrink-0 ml-2">
        <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
          {folder}
        </span>
        <span className="text-xs text-neutral-400 whitespace-nowrap">{time}</span>
      </div>
    </div>
  )
}
