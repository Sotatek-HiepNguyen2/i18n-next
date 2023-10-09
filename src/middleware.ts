import { NextRequest, NextResponse } from 'next/server'
import { i18nConfig, localeCookieKey } from '@/i18n/settings'
import localeDetector from './i18n/helpers/localDectector'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = i18nConfig.locales.some((locale) => {
    return pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  })

  if (pathnameHasLocale) return
  // Redirect if there's unsupported locale

  let locale: string | undefined
  // Check locale from cookie
  if (request.cookies.has(localeCookieKey)) {
    const cookieLocaleValue = request.cookies.get(localeCookieKey)?.value

    if (cookieLocaleValue && i18nConfig.locales.includes(cookieLocaleValue)) {
      locale = cookieLocaleValue
    }
  }

  if (!locale) {
    locale = localeDetector(request)
  }

  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-us/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
