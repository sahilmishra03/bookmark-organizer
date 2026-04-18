import FolderCard from "@/components/home/folders/FolderCard"

const folders = [
  { name: "Dev", count: 12, color: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300" },
  { name: "Design", count: 5, color: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300" },
  { name: "Tools", count: 3, color: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300" },
  { name: "Articles", count: 7, color: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300" },
  { name: "Inspiration", count: 4, color: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300" },
  { name: "Research", count: 2, color: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300" },
]

export default function FoldersPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Folders</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">Organise bookmarks into folders</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 hover:opacity-90 text-white dark:text-neutral-900 text-sm font-medium transition-opacity">
          + New Folder
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {folders.map((f) => (
          <FolderCard key={f.name} {...f} />
        ))}
        <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-5 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors min-h-[120px]">
          <span className="text-xl text-neutral-400">+</span>
          <span className="text-sm text-neutral-400">New folder</span>
        </div>
      </div>
    </div>
  )
}
