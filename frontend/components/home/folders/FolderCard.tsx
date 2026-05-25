import { Trash2, Pencil } from "lucide-react"

interface FolderCardProps {
  name: string
  count: number
  color: string
  onClick?: () => void
  onDelete?: () => void
  onRename?: () => void
}

export default function FolderCard({ name, count, color, onClick, onDelete, onRename }: FolderCardProps) {
  return (
    <div onClick={onClick} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 cursor-pointer transition-colors relative group">
      {onRename && (
        <button
          onClick={e => { e.stopPropagation(); onRename() }}
          className="absolute top-3 right-10 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-neutral-700"
        >
          <Pencil size={14} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={e => { e.stopPropagation(); onDelete() }}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-red-500"
        >
          <Trash2 size={14} />
        </button>
      )}
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold mb-3 ${color}`}>
        {name[0]}
      </div>
      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{name}</p>
      <p className="text-xs text-neutral-400 mt-0.5">{count} bookmarks</p>
    </div>
  )
}
