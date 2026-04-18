import BookmarkRow from "@/components/home/bookmarks/BookmarkRow"

const bookmarks = [
  { title: "Next.js App Router Docs", url: "nextjs.org/docs", folder: "Dev", starred: true, time: "2h ago" },
  { title: "Tailwind CSS v4 Release", url: "tailwindcss.com/blog", folder: "Design", starred: false, time: "5h ago" },
  { title: "Framer Motion Examples", url: "framer.com/motion", folder: "Dev", starred: true, time: "1d ago" },
  { title: "Linear — Project Management", url: "linear.app", folder: "Tools", starred: false, time: "2d ago" },
  { title: "Vercel Dashboard", url: "vercel.com/dashboard", folder: "Dev", starred: false, time: "3d ago" },
  { title: "Figma Community Files", url: "figma.com/community", folder: "Design", starred: true, time: "4d ago" },
  { title: "shadcn/ui Components", url: "ui.shadcn.com", folder: "Dev", starred: true, time: "5d ago" },
  { title: "Supabase Docs", url: "supabase.com/docs", folder: "Dev", starred: false, time: "1w ago" },
]

export default function BookmarksPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Bookmarks</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">All your saved bookmarks</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 hover:opacity-90 text-white dark:text-neutral-900 text-sm font-medium transition-opacity">
          + Add Bookmark
        </button>
      </div>

      <input
        type="text"
        placeholder="Search bookmarks..."
        className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-neutral-400 mb-6"
      />

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800">
        {bookmarks.map((b) => (
          <BookmarkRow key={b.title} {...b} />
        ))}
      </div>
    </div>
  )
}
