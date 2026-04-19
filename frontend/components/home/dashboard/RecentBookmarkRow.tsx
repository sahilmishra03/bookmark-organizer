"use client"

import { motion } from "framer-motion"
import { LinkPreview } from "@/components/ui/link-preview"

interface RecentBookmarkRowProps {
  title: string
  url: string
  folder: string
  time: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
}

export default function RecentBookmarkRow({ title, url, folder, time }: RecentBookmarkRowProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-center justify-between px-5 py-3 rounded-b-lg cursor-pointer group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
    >
      <div className="min-w-0">
        <LinkPreview
          url={`https://${url}`}
          className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors truncate block"
        >
          {title}
        </LinkPreview>
        <p className="text-xs text-neutral-400">{url}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
          {folder}
        </span>
        <span className="text-xs text-neutral-400">{time}</span>
      </div>
    </motion.div>
  )
}
