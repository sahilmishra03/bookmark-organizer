export interface Folder {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string | null
}

export interface Bookmark {
  id: string
  title: string
  url: string
  description: string | null
  favorite: boolean
  folder_id: string
  created_at: string
  updated_at: string | null
}
