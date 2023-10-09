import { NextRequest, NextResponse } from 'next/server'
import i18nConfig, { localeCookieKey } from '@/i18n/settings'
import localeDetector from '@/i18n/localDectector'

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}

export function middleware(request: NextRequest) {
  // Check locale
  debugger
  const { pathname, basePath } = request.nextUrl
  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (!pathnameHasLocale) return
  // Redirect if there's unsupported locale
  // const locale = localeDetector(request, i18nConfig)

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

  let toPathname = `${locale}${pathname}`
  const basePathTrailingSlash = basePath.endsWith('/')
  toPathname = `${basePath}${basePathTrailingSlash ? '' : '/'}${toPathname}`

  if (request.nextUrl.search) {
    toPathname += request.nextUrl.search
  }

  if (locale !== i18nConfig.defaultLocale) {
    return NextResponse.redirect(new URL(toPathname, request.url))
  }

  const response = NextResponse.next()
  response.headers.set(localeCookieKey, locale || i18nConfig.defaultLocale)

  return response
}
