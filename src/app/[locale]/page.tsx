import { serverTranslation } from '@/i18n/apis/serverTranslation'
import Link from 'next/link'

const i18nNamespaces = ['home']

export default async function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  if (false) {
  }
  const { t } = await serverTranslation(locale, i18nNamespaces)

  return (
    <main>
      <h1>Hi {t('name', { ns: i18nNamespaces })}!</h1>
      <Link href={`/${locale}/cubes`}>second page</Link>
    </main>
  )
}
