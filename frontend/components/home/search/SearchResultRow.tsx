"use client"

import { LinkPreview } from "@/components/ui/link-preview"

interface SearchResultRowProps {
  title: string
  url: string
  folder: string
}

export default function SearchResultRow({ title, url, folder }: SearchResultRowProps) {
  return (
    <div className="flex items-center justify-between px-5 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
      <div>
        <LinkPreview
          url={`https://${url}`}
          className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
        >
          {title}
        </LinkPreview>
        <p className="text-xs text-neutral-400">{url}</p>
      </div>
      <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 shrink-0">
        {folder}
      </span>
    </div>
  )
}
