import { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18nConfig } from '../settings'

/**
 * Dectect user's locale from request
 * https://nextjs.org/docs/app/building-your-application/routing/internationalization#routing-overview
 */
function localeDetector(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {}

  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  // No accept-language header
  if (!languages || (languages.length === 1 && languages[0] === '*')) {
    return i18nConfig.defaultLocale
  }

  return match(languages, i18nConfig.locales, i18nConfig.defaultLocale)
}

export default localeDetector
