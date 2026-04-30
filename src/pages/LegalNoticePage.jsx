import { Navigate, useParams, Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'

const ALLOWED = ['privacy', 'terms', 'cookies']

export default function LegalNoticePage() {
  const { doc } = useParams()
  const { t } = useI18n()

  if (!ALLOWED.includes(doc)) {
    return <Navigate to="/" replace />
  }

  const titleKey = `legal.${doc}Title`
  const bodyKey = `legal.${doc}Body`

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        <Link to="/" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
          {t('legal.backHome')}
        </Link>
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t(titleKey)}</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t('legal.lastUpdated')}</p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {t(bodyKey)
          .split('\n\n')
          .filter(Boolean)
          .map((para, i) => (
            <p key={i}>{para}</p>
          ))}
      </div>
    </div>
  )
}
