import { create } from 'zustand'
import { getAccessToken, getUser, setTokens, setUser, clearTokens } from '@/lib/tokenUtils'

interface User {
  name: string
  email: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  setAuth: (user: User, accessToken: string, refreshToken: string) => void
  clearAuth: () => void
  hydrateFromCookies: () => void
  updateTokens: (accessToken: string, refreshToken: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setAuth: (user, accessToken, refreshToken) => {
    setTokens(accessToken, refreshToken)
    setUser(user)
    set({ user, accessToken, isAuthenticated: true })
  },

  clearAuth: () => {
    clearTokens()
    set({ user: null, accessToken: null, isAuthenticated: false })
  },

  hydrateFromCookies: () => {
    const accessToken = getAccessToken()
    const user = getUser()
    if (accessToken) {
      set({ accessToken, isAuthenticated: true, ...(user && { user }) })
    }
  },

  updateTokens: (accessToken, refreshToken) => {
    setTokens(accessToken, refreshToken)
    set({ accessToken, isAuthenticated: true })
  },
}))
