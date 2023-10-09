'use client'

import React, { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'i18next'
import { initTranslations } from '../helpers/createInstance'

let i18nInstance: i18n

export function ClientTranslationProvider({
  children,
  locale,
  namespaces,
}: {
  children: React.ReactNode
  locale: string
  namespaces: string[]
}) {
  const [instance, setInstance] = useState(i18nInstance)

  useEffect(() => {
    const init = async () => {
      if (!i18nInstance) {
        const newInstance = await initTranslations(locale, namespaces)
        i18nInstance = newInstance
        setInstance(newInstance)
      } else {
        if (i18nInstance.language !== locale) {
          i18nInstance.changeLanguage(locale)
        }
      }
    }

    init()
  }, [locale, namespaces])

  if (!instance) {
    return null
  }

  return (
    <I18nextProvider i18n={instance} defaultNS={namespaces[0]}>
      {children}
    </I18nextProvider>
  )
}
