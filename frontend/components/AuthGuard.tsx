'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { getRefreshToken, isAccessTokenExpired } from '@/lib/tokenUtils'
import { useDataStore } from '@/store/dataStore'
import api from '@/lib/api'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { hydrateFromCookies, updateTokens, clearAuth } = useAuthStore()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Fire a lightweight ping to wake the backend while auth is checking
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://bookmark-organizer-jtx3.onrender.com').replace(/\/+$/, '')
    fetch(apiUrl, { method: 'GET', mode: 'no-cors' }).catch(() => {})

    async function check() {
      hydrateFromCookies()

      const authState = useAuthStore.getState()
      
      // Fast path: valid token exists — render immediately, fetch profile in background
      if (authState.isAuthenticated && !isAccessTokenExpired()) {
        // Start data prefetch immediately (in parallel with profile fetch)
        useDataStore.getState().fetchAll()

        setChecking(false) // Unblock rendering NOW

        // Fetch user profile in background (non-blocking)
        if (!authState.user) {
          api.get('/user/profile', {
            headers: { Authorization: `Bearer ${authState.accessToken}` },
          }).then(({ data }) => {
            useAuthStore.getState().setAuth(
              { 
                name: data.name, 
                email: data.email, 
                profile_picture: data.profile_picture 
              }, 
              authState.accessToken || '', 
              getRefreshToken() || ''
            )
          }).catch((error) => {
            console.error('Failed to fetch user profile:', error)
          })
        }
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
        
        // Start data prefetch immediately after token refresh
        useDataStore.getState().fetchAll()
        
        setChecking(false) // Unblock rendering NOW

        // Fetch user profile in background (non-blocking)
        const updatedAuthState = useAuthStore.getState()
        if (!updatedAuthState.user) {
          api.get('/user/profile', {
            headers: { Authorization: `Bearer ${data.access_token}` },
          }).then(({ data: userData }) => {
            useAuthStore.getState().setAuth(
              { 
                name: userData.name, 
                email: userData.email, 
                profile_picture: userData.profile_picture 
              }, 
              data.access_token, 
              data.refresh_token
            )
          }).catch((error) => {
            console.error('Failed to fetch user profile after refresh:', error)
          })
        }
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
