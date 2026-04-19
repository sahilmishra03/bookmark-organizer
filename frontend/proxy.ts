import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
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
