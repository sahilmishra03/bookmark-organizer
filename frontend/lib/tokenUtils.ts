import Cookies from 'js-cookie'

const ACCESS_KEY = 'access_token'
const REFRESH_KEY = 'refresh_token'
const USER_KEY = 'user_info'

export function setTokens(accessToken: string, refreshToken: string) {
  Cookies.set(ACCESS_KEY, accessToken, { expires: 1 / 96, sameSite: 'lax' })
  Cookies.set(REFRESH_KEY, refreshToken, { expires: 7, sameSite: 'lax' })
}

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_KEY)
}

export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_KEY)
}

export function setUser(user: { name: string; email: string }) {
  Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7, sameSite: 'lax' })
}

export function getUser(): { name: string; email: string } | null {
  try {
    const raw = Cookies.get(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearTokens() {
  Cookies.remove(ACCESS_KEY)
  Cookies.remove(REFRESH_KEY)
  Cookies.remove(USER_KEY)
}
