"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LogOut, Mail, User } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { getRefreshToken } from "@/lib/tokenUtils"
import api from "@/lib/api"

interface MeResponse {
  message: string
  user: {
    user_id: string
    email: string
    exp: number
    iat: number
    type: string
    iss: string
    sub: string
  }
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, clearAuth } = useAuthStore()
  const [meData, setMeData] = useState<MeResponse["user"] | null>(null)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    api.get<MeResponse>("/me")
      .then(({ data }) => setMeData(data.user))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = async () => {
    setLoggingOut(true)
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      await api.post("/logout", null, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }).catch(() => {})
    }
    clearAuth()
    router.replace("/login")
  }

  const displayName = user?.name || meData?.email?.split("@")[0] || "User"
  const displayEmail = meData?.email || user?.email || ""
  const initial = displayName[0]?.toUpperCase() ?? "?"

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Profile</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">Your account information</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="max-w-lg rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden"
      >
        {/* Avatar header */}
        <div className="flex items-center gap-4 px-6 py-6 border-b border-neutral-200 dark:border-neutral-800">
          {user?.profile_picture ? (
            <img
              src={user.profile_picture}
              alt={displayName}
              className="h-14 w-14 rounded-full object-cover shrink-0"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e) => {
                console.error('Failed to load profile picture in profile page:', user.profile_picture)
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  const fallback = parent.querySelector('.fallback-avatar') as HTMLElement
                  if (fallback) fallback.style.display = 'flex'
                }
              }}
            />
          ) : null}
          <div className={`h-14 w-14 rounded-full bg-neutral-800 dark:bg-neutral-200 flex items-center justify-center shrink-0 fallback-avatar ${user?.profile_picture ? 'hidden' : ''}`}>
            <span className="text-xl font-bold text-white dark:text-neutral-900">{initial}</span>
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate">{displayName}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">{displayEmail}</p>
          </div>
        </div>

        {/* Details */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <InfoRow icon={User} label="Name" value={loading ? "—" : displayName} />
          <InfoRow icon={Mail} label="Email" value={loading ? "—" : displayEmail} />
        </div>

        {/* Logout */}
        <div className="px-6 py-5 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <LogOut size={15} />
            {loggingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <Icon size={15} className="text-neutral-400 shrink-0" />
      <span className="text-sm text-neutral-500 dark:text-neutral-400 w-20 shrink-0">{label}</span>
      <span className="text-sm text-neutral-900 dark:text-neutral-100 truncate">{value}</span>
    </div>
  )
}
