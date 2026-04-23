'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

function CallbackHandler() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)

  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const name = searchParams.get('name') || ''
    const email = searchParams.get('email') || ''
    const profile_picture = decodeURIComponent(searchParams.get('profile_picture') || '')

    // Debug: Log the received profile picture
    console.log('Profile picture received (decoded):', profile_picture)

    if (accessToken && refreshToken) {
      setAuth({ name, email, profile_picture }, accessToken, refreshToken)
      router.replace('/home')
    } else {
      router.replace('/login?error=auth_failed')
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 dark:border-white mx-auto" />
        <p className="mt-3 text-sm text-neutral-500">Signing in...</p>
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <CallbackHandler />
    </Suspense>
  )
}
