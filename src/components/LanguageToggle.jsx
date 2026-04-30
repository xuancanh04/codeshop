import { useI18n } from '../context/I18nContext'

export default function LanguageToggle({ className = '' }) {
  const { locale, setLanguage, languages } = useI18n()

  return (
    <label className={`flex items-center gap-2 ${className}`}>
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => setLanguage(e.target.value)}
        className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        {languages.map((l) => (
          <option key={l.id} value={l.id}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  )
}
