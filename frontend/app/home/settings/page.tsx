"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Download, Upload, Globe, AlertCircle, CheckCircle } from "lucide-react"
import api from "@/lib/api"
import type { Bookmark, Folder } from "@/lib/types"

export default function SettingsPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState<{
    success: boolean
    message: string
    imported: number
  } | null>(null)

  useEffect(() => {
    Promise.all([
      api.get<Bookmark[]>("/v1/bookmarks/allbookmarks"),
      api.get<Folder[]>("/v1/folders"),
    ]).then(([bRes, fRes]) => {
      setBookmarks(bRes.data)
      setFolders(fRes.data)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleExportHTML = async () => {
    setExporting(true)
    try {
      const response = await api.get("/v1/import-export/export/html", {
        responseType: 'blob'
      })
      
      const blob = new Blob([response.data], {
        type: "text/html"
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "bookmarks.html"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("HTML export failed:", error)
    } finally {
      setExporting(false)
    }
  }

  const handleImportHTML = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImporting(true)
    setImportResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post("/v1/import-export/import/html", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // Refresh data
      const [bRes, fRes] = await Promise.all([
        api.get<Bookmark[]>("/v1/bookmarks/allbookmarks"),
        api.get<Folder[]>("/v1/folders"),
      ])
      setBookmarks(bRes.data)
      setFolders(fRes.data)

      setImportResult({
        success: true,
        message: `Successfully imported ${response.data.bookmarks_added} bookmarks from HTML file.`,
        imported: response.data.bookmarks_added
      })

    } catch (error: any) {
      setImportResult({
        success: false,
        message: error.response?.data?.detail || "HTML import failed",
        imported: 0
      })
    } finally {
      setImporting(false)
      // Reset file input
      event.target.value = ""
    }
  }

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Settings</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">Manage your bookmark data</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="max-w-2xl space-y-6"
      >
        {/* Import/Export Section */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Globe size={18} />
              Import & Export
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Back up your bookmarks or import from browser bookmark files
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Export Section */}
            <div className="space-y-3">
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Export Bookmarks</h3>
              
              {/* HTML Export */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe size={16} className="text-neutral-500" />
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">HTML Format</h4>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Export in Chrome bookmark format for browser import
                  </p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                    {bookmarks.length} bookmarks, {folders.length} folders
                  </p>
                </div>
                <button
                  onClick={handleExportHTML}
                  disabled={exporting || loading || bookmarks.length === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 hover:opacity-90 text-white dark:text-neutral-900 text-sm font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={16} />
                  {exporting ? "Exporting…" : "Export"}
                </button>
              </div>
            </div>

            {/* Import Section */}
            <div className="space-y-3">
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Import Bookmarks</h3>
              
              {/* HTML Import */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe size={16} className="text-neutral-500" />
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">HTML Format</h4>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Import from Chrome or other browser bookmark files
                  </p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                    Supports .html bookmark files from browsers
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    accept=".html"
                    onChange={handleImportHTML}
                    disabled={importing || loading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <button
                    disabled={importing || loading}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload size={16} />
                    {importing ? "Importing…" : "Import"}
                  </button>
                </div>
              </div>
            </div>

            {/* Import Result */}
            {importResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border ${
                  importResult.success
                    ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                    : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  {importResult.success ? (
                    <CheckCircle size={18} className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={18} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      importResult.success
                        ? "text-green-800 dark:text-green-200"
                        : "text-red-800 dark:text-red-200"
                    }`}>
                      {importResult.success ? "Import Complete" : "Import Failed"}
                    </p>
                    <p className={`text-sm mt-1 ${
                      importResult.success
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}>
                      {importResult.message}
                    </p>
                  </div>
                  <button
                    onClick={() => setImportResult(null)}
                    className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 ml-2"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Data Summary */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Data Summary</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {loading ? "—" : bookmarks.length}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Bookmarks</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {loading ? "—" : folders.length}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Folders</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
