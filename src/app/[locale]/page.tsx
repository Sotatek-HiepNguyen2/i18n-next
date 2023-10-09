import Link from 'next/link'
import { useTranslation } from '../i18n'

const i18nNamespaces = ['home']

export default async function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const { t } = await useTranslation(locale, i18nNamespaces)

  return (
    <main>
      <h1>Hi there!</h1>
      <Link href={`/${locale}/cubes`}>second page</Link>
    </main>
  )
}
