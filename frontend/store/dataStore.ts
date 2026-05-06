import { create } from 'zustand'
import api from '@/lib/api'
import type { Bookmark, Folder } from '@/lib/types'

interface DataState {
  bookmarks: Bookmark[]
  folders: Folder[]
  favorites: Bookmark[]
  isLoaded: boolean
  isLoading: boolean

  // Core fetch — called once, shared across all pages
  fetchAll: () => Promise<void>
  forceRefresh: () => Promise<void>
  invalidate: () => void

  // Bookmark mutators
  addBookmark: (bookmark: Bookmark) => void
  updateBookmark: (bookmark: Bookmark) => void
  deleteBookmark: (bookmarkId: string) => void
  toggleFavorite: (bookmark: Bookmark) => void

  // Folder mutators
  addFolder: (folder: Folder) => void
  deleteFolder: (folderId: string) => void
}

export const useDataStore = create<DataState>((set, get) => ({
  bookmarks: [],
  folders: [],
  favorites: [],
  isLoaded: false,
  isLoading: false,

  fetchAll: async () => {
    const { isLoaded, isLoading } = get()
    if (isLoaded || isLoading) return

    set({ isLoading: true })
    try {
      const [bRes, fRes, favRes] = await Promise.all([
        api.get<Bookmark[]>('/v1/bookmarks/allbookmarks'),
        api.get<Folder[]>('/v1/folders'),
        api.get<Bookmark[]>('/v1/bookmarks/favorites'),
      ])
      set({
        bookmarks: bRes.data,
        folders: fRes.data,
        favorites: favRes.data,
        isLoaded: true,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  forceRefresh: async () => {
    set({ isLoading: true })
    try {
      const [bRes, fRes, favRes] = await Promise.all([
        api.get<Bookmark[]>('/v1/bookmarks/allbookmarks'),
        api.get<Folder[]>('/v1/folders'),
        api.get<Bookmark[]>('/v1/bookmarks/favorites'),
      ])
      set({
        bookmarks: bRes.data,
        folders: fRes.data,
        favorites: favRes.data,
        isLoaded: true,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  invalidate: () => {
    set({ isLoaded: false, isLoading: false })
  },

  addBookmark: (bookmark) => {
    set((s) => ({
      bookmarks: [bookmark, ...s.bookmarks],
      favorites: bookmark.favorite ? [bookmark, ...s.favorites] : s.favorites,
    }))
  },

  updateBookmark: (bookmark) => {
    set((s) => ({
      bookmarks: s.bookmarks.map((b) => (b.id === bookmark.id ? bookmark : b)),
      favorites: bookmark.favorite
        ? s.favorites.some((f) => f.id === bookmark.id)
          ? s.favorites.map((f) => (f.id === bookmark.id ? bookmark : f))
          : [bookmark, ...s.favorites]
        : s.favorites.filter((f) => f.id !== bookmark.id),
    }))
  },

  deleteBookmark: (bookmarkId) => {
    set((s) => ({
      bookmarks: s.bookmarks.filter((b) => b.id !== bookmarkId),
      favorites: s.favorites.filter((f) => f.id !== bookmarkId),
    }))
  },

  toggleFavorite: (bookmark) => {
    const updated = { ...bookmark, favorite: !bookmark.favorite }
    set((s) => ({
      bookmarks: s.bookmarks.map((b) => (b.id === bookmark.id ? updated : b)),
      favorites: updated.favorite
        ? [updated, ...s.favorites]
        : s.favorites.filter((f) => f.id !== bookmark.id),
    }))
  },

  addFolder: (folder) => {
    set((s) => ({ folders: [...s.folders, folder] }))
  },

  deleteFolder: (folderId) => {
    set((s) => ({
      folders: s.folders.filter((f) => f.id !== folderId),
      bookmarks: s.bookmarks.filter((b) => b.folder_id !== folderId),
      favorites: s.favorites.filter((f) => f.folder_id !== folderId),
    }))
  },
}))
