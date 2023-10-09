import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import i18nConfig from '@/i18n/settings'

async function initTranslations(locale: string, namespaces: string[]) {
  const i18nInstance = createInstance()

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/i18n/locales/${language}/${namespace}.json`),
      ),
    )
    .init({
      lng: locale,
      fallbackLng: i18nConfig.defaultLocale,
      supportedLngs: i18nConfig.locales,
      defaultNS: namespaces[0],
      fallbackNS: namespaces[0],
      ns: namespaces,
      preload: typeof window === 'undefined' ? i18nConfig.locales : [],
    })

  return i18nInstance
}

export async function useTranslation(
  locale: string,
  namespaces: string[],
  options: { keyPrefix?: string } = {},
) {
  const i18nextInstance = await initTranslations(locale, namespaces)

  return {
    t: i18nextInstance.getFixedT(
      locale,
      Array.isArray(namespaces) ? namespaces[0] : namespaces,
      options.keyPrefix,
    ),
    i18n: i18nextInstance,
  }
}
