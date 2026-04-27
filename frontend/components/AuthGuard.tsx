'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { getRefreshToken, isAccessTokenExpired } from '@/lib/tokenUtils'
import api from '@/lib/api'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { hydrateFromCookies, updateTokens, clearAuth } = useAuthStore()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function check() {
      hydrateFromCookies()

      const authState = useAuthStore.getState()
      
      // Check if we have an access token but no user data
      if (authState.isAuthenticated && !isAccessTokenExpired()) {
        if (!authState.user) {
          // If we have a token but no user data, try to fetch user info
          try {
            const { data } = await api.get('/user/profile', {
              headers: { Authorization: `Bearer ${authState.accessToken}` },
            })
            // Update the store with user data
            useAuthStore.getState().setAuth(
              { 
                name: data.name, 
                email: data.email, 
                profile_picture: data.profile_picture 
              }, 
              authState.accessToken || '', 
              getRefreshToken() || ''
            )
          } catch (error) {
            console.error('Failed to fetch user profile:', error)
            // Continue without user data - sidebar will show fallback
          }
        }
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
        
        // After refreshing tokens, fetch user data if not available
        const updatedAuthState = useAuthStore.getState()
        if (!updatedAuthState.user) {
          try {
            const { data: userData } = await api.get('/user/profile', {
              headers: { Authorization: `Bearer ${data.access_token}` },
            })
            useAuthStore.getState().setAuth(
              { 
                name: userData.name, 
                email: userData.email, 
                profile_picture: userData.profile_picture 
              }, 
              data.access_token, 
              data.refresh_token
            )
          } catch (error) {
            console.error('Failed to fetch user profile after refresh:', error)
          }
        }
        
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
