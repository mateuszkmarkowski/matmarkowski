import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'mateusz-os-auth'
const PROTECTED_PATH = '/os'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /os routes (but not /os/login itself)
  if (!pathname.startsWith(PROTECTED_PATH) || pathname.startsWith('/os/login')) {
    return NextResponse.next()
  }

  const authCookie = request.cookies.get(COOKIE_NAME)

  if (!authCookie || authCookie.value !== 'authenticated') {
    const loginUrl = new URL('/os/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/os/:path*'],
}
