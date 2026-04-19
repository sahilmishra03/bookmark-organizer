'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { getRefreshToken } from '@/lib/tokenUtils'
import api from '@/lib/api'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { hydrateFromCookies, updateTokens, clearAuth } = useAuthStore()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function check() {
      hydrateFromCookies()

      if (useAuthStore.getState().isAuthenticated) {
        setChecking(false)
        return
      }

      const refreshToken = getRefreshToken()
      if (!refreshToken) {
        router.replace('/login')
        return
      }

      try {
        const { data } = await api.post('/refresh', null, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        })
        updateTokens(data.access_token, data.refresh_token)
        setChecking(false)
      } catch {
        clearAuth()
        router.replace('/login')
      }
    }

    check()
  }, [])

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 dark:border-white" />
      </div>
    )
  }

  return <>{children}</>
}
