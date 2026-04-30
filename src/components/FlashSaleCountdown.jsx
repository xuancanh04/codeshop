import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import ProductCard from './ProductCard'

function endOfToday() {
  const d = new Date()
  d.setHours(23, 59, 59, 999)
  return d.getTime()
}

export default function FlashSaleCountdown({ projects }) {
  const { t } = useI18n()
  const [ms, setMs] = useState(() => Math.max(0, endOfToday() - Date.now()))

  useEffect(() => {
    const id = window.setInterval(() => {
      setMs(Math.max(0, endOfToday() - Date.now()))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)

  if (!projects?.length) return null

  return (
    <section className="border-b border-blue-100/80 bg-gradient-to-br from-blue-50/90 via-white to-violet-50/50 dark:border-rose-900/40 dark:from-rose-950/40 dark:via-slate-950 dark:to-orange-950/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600 dark:text-rose-400">
              {t('flash.kicker')}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{t('flash.title')}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t('flash.subtitle')}</p>
          </div>
          <div
            className="flex gap-2 rounded-2xl border border-blue-200/90 bg-white px-4 py-3 font-mono text-lg font-bold tabular-nums text-blue-800 shadow-sm dark:border-rose-800 dark:bg-slate-900/90 dark:text-rose-300"
            aria-live="polite"
          >
            <span className="rounded-lg bg-blue-100 px-2 py-1 dark:bg-rose-950/80">
              {String(h).padStart(2, '0')}
            </span>
            <span className="text-blue-400 dark:text-rose-400">:</span>
            <span className="rounded-lg bg-blue-100 px-2 py-1 dark:bg-rose-950/80">
              {String(m).padStart(2, '0')}
            </span>
            <span className="text-blue-400 dark:text-rose-400">:</span>
            <span className="rounded-lg bg-blue-100 px-2 py-1 dark:bg-rose-950/80">
              {String(s).padStart(2, '0')}
            </span>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-500 sm:text-left">{t('flash.endsToday')}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <ProductCard key={p.id} project={p} />
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link
            to="/#catalog"
            className="text-sm font-semibold text-blue-600 hover:underline dark:text-rose-400"
          >
            {t('flash.seeAll')}
          </Link>
        </p>
      </div>
    </section>
  )
}
