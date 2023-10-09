import { LocaleConfig } from './type'

export const localeCookieKey = 'x-i18n-locale'
const i18nConfig: LocaleConfig = {
  locales: ['en', 'ja', 'kr', 'vi'],
  defaultLocale: 'en',
}

export default i18nConfig
