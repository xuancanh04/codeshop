import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import Button from '../components/Button'

const SERVICE_KEYS = ['svc1', 'svc2', 'svc3']
const ICONS = [
  <path key="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 6.75h4.5m-4.5 3h4.5m-4.5 3h4.5M6.75 3.75h10.5A2.25 2.25 0 0119.5 6v12a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6a2.25 2.25 0 012.25-2.25z" />,
  <path key="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  <path key="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m7-1a9 9 0 11-18 0 9 9 0 0118 0z" />,
]

export default function ServicesPage() {
  const { t } = useI18n()

  return (
    <div className="border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl dark:bg-[#a000ff]/12"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-300/12 blur-3xl dark:bg-[#0084ff]/10"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {t('services.kicker')}
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-center text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {t('services.title')}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            {t('services.subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button as={Link} to="/contact" variant="primary">
              {t('services.ctaPrimary')}
            </Button>
            <Button as={Link} to="/#catalog" variant="secondary">
              {t('services.ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {t('services.packagesTitle')}
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{t('services.packagesSub')}</p>
          </div>

          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {SERVICE_KEYS.map((k, i) => (
              <li
                key={k}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    {ICONS[i]}
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{t(`categoriesSection.${k}Title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t(`categoriesSection.${k}Body`)}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button as={Link} to="/contact" variant="secondary" size="sm">
                    {t('services.askQuote')}
                  </Button>
                  <Button as={Link} to="/contact" variant="outline" size="sm">
                    {t('services.chat')}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

