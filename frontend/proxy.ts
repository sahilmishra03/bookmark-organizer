import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Toggle this to false (or use process.env.MAINTENANCE_MODE === 'true') to disable maintenance redirection
const MAINTENANCE_MODE = true

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

  // 1. Check Maintenance Mode
  if (MAINTENANCE_MODE) {
    const isMaintenancePage = path === '/maintenance'
    // Allow static assets, API routes, and file downloads (.svg, .ico, .woff2, etc.) to pass through
    const isStaticAsset =
      path.startsWith('/_next') ||
      path.startsWith('/api') ||
      path.includes('.') ||
      path === '/favicon.ico'

    if (!isMaintenancePage && !isStaticAsset) {
      return NextResponse.redirect(new URL('/maintenance', request.url))
    }
  }

  // 2. Auth Guards
  const refreshToken = request.cookies.get('refresh_token')?.value
  const isProtected = path.startsWith('/home')
  const isLogin = path === '/login'

  if (isProtected && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isLogin && refreshToken) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|auth/callback|.*\\.png$).*)'],
}


