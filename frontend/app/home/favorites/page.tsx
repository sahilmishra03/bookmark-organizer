import FavoriteRow from "@/components/home/favorites/FavoriteRow"

const favorites = [
  { title: "Next.js App Router Docs", url: "nextjs.org/docs", folder: "Dev", time: "2h ago" },
  { title: "Framer Motion Examples", url: "framer.com/motion", folder: "Dev", time: "1d ago" },
  { title: "Figma Community Files", url: "figma.com/community", folder: "Design", time: "4d ago" },
  { title: "shadcn/ui Components", url: "ui.shadcn.com", folder: "Dev", time: "5d ago" },
]

export default function FavoritesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Favorites</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">Bookmarks you've starred</p>

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800">
        {favorites.map((f) => (
          <FavoriteRow key={f.title} {...f} />
        ))}
      </div>
    </div>
  )
}
