import { initTranslations } from '../helpers/createInstance'

/**
 * Expose a translation function `t` for server component
 */
export async function serverTranslation(
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
