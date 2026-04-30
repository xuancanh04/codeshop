import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'

const SERVICE_KEYS = ['svc1', 'svc2', 'svc3']

const CATEGORY_ICONS = {
  web: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  ),
  mobile: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  ),
  ai: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  ),
  java: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  ),
  react: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  ),
  nodejs: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  ),
}

/**
 * @param {{ categories: { id: string, label: string }[], projects: { category: string }[] }} props
 */
export default function CategoriesAndServicesSection({ categories, projects }) {
  const { t } = useI18n()

  const counts = useMemo(() => {
    const m = Object.fromEntries(categories.map((c) => [c.id, 0]))
    for (const p of projects) {
      if (m[p.category] != null) m[p.category] += 1
    }
    return m
  }, [categories, projects])

  return (
    <section
      id="categories-services"
      className="scroll-mt-24 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {t('categoriesSection.kicker')}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {t('categoriesSection.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            {t('categoriesSection.subtitle')}
          </p>
        </div>

        <h3 className="mt-12 text-lg font-semibold text-slate-900 dark:text-white">
          {t('categoriesSection.productsHeading')}
        </h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const icon = CATEGORY_ICONS[c.id] ?? CATEGORY_ICONS.web
            const count = counts[c.id] ?? 0
            return (
              <li key={c.id}>
                <Link
                  to={`/?cat=${encodeURIComponent(c.id)}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm transition hover:border-blue-300/80 hover:bg-white hover:shadow-md dark:border-slate-700 dark:bg-slate-900/60 dark:hover:border-blue-500/40 dark:hover:bg-slate-900"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                        {icon}
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {t(`catalog.cat.${c.id}`)}
                      </span>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {t('categoriesSection.countLabel', { count })}
                      </p>
                    </div>
                  </div>
                  <span className="mt-4 text-sm font-medium text-blue-600 group-hover:underline dark:text-blue-400">
                    {t('categoriesSection.viewCategory')} →
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div id="services" className="scroll-mt-28">
          <h3 className="mt-14 text-lg font-semibold text-slate-900 dark:text-white">
            {t('categoriesSection.servicesHeading')}
          </h3>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {SERVICE_KEYS.map((key) => (
              <li key={key}>
                <Link
                  to="/contact"
                  className="flex h-full flex-col rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50/90 to-white p-5 shadow-sm transition hover:border-violet-300 hover:shadow-md dark:border-violet-900/50 dark:from-violet-950/30 dark:to-slate-900 dark:hover:border-violet-700/60"
                >
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {t(`categoriesSection.${key}Title`)}
                  </span>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {t(`categoriesSection.${key}Body`)}
                  </p>
                  <span className="mt-4 text-sm font-medium text-violet-700 dark:text-violet-400">
                    {t('categoriesSection.contactCta')} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
