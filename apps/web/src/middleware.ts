import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const response = NextResponse.next()

  if (pathname.startsWith('/org')) {
    const [, , slug] = pathname.split('/')

    response.cookies.set('@saas:org', slug)
  } else {
    response.cookies.delete('@saas:org')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
