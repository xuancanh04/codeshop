import { useI18n } from '../context/I18nContext'

export default function TestimonialsHomeSection() {
  const { t } = useI18n()
  const ids = ['a', 'b', 'c']

  return (
    <section className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white">{t('testimonials.title')}</h2>
        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {ids.map((id) => (
            <li
              key={id}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                &ldquo;{t(`testimonials.${id}Quote`)}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{t(`testimonials.${id}Name`)}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t(`testimonials.${id}Role`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
