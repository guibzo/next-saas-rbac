import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { doSignInWithGitHub } from '@/http/do-sign-in-with-github'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth  code was not found.' },
      { status: 400 },
    )
  }

  const { token } = await doSignInWithGitHub({ code })

  cookies().set('@saas:token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7days
  })

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}
