import SearchResultRow from "@/components/home/search/SearchResultRow"

const results = [
  { title: "Next.js App Router Docs", url: "nextjs.org/docs", folder: "Dev" },
  { title: "Tailwind CSS v4 Release", url: "tailwindcss.com/blog", folder: "Design" },
  { title: "shadcn/ui Components", url: "ui.shadcn.com", folder: "Dev" },
]

export default function SearchPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Search</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">Search across all your bookmarks</p>

      <input
        type="text"
        defaultValue="next"
        placeholder="Search bookmarks..."
        className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-neutral-400 mb-2"
      />
      <p className="text-xs text-neutral-400 mb-6">{results.length} results</p>

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800">
        {results.map((r) => (
          <SearchResultRow key={r.title} {...r} />
        ))}
      </div>
    </div>
  )
}
