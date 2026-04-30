import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { messages, defaultLocale } from '../i18n/translations'
import { useLocalStorage } from '../hooks/useLocalStorage'

const I18nContext = createContext(null)

function lookup(table, key) {
  if (!table || !key) return key
  const v = table[key]
  return v != null ? v : key
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useLocalStorage('cm-locale', defaultLocale)

  useEffect(() => {
    document.documentElement.lang = locale === 'vi' ? 'vi' : 'en'
  }, [locale])

  const table = messages[locale] ?? messages.en

  const t = useCallback(
    (key, vars) => {
      let out = lookup(table, key)
      if (vars && typeof out === 'string') {
        Object.entries(vars).forEach(([k, v]) => {
          out = out.replaceAll(`{${k}}`, String(v))
        })
      }
      return out
    },
    [table],
  )

  const setLanguage = useCallback(
    (next) => {
      if (messages[next]) setLocale(next)
    },
    [setLocale],
  )

  const value = useMemo(
    () => ({
      locale,
      setLanguage,
      t,
      languages: [
        { id: 'vi', label: 'Tiếng Việt' },
        { id: 'en', label: 'English' },
      ],
    }),
    [locale, setLanguage, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- useI18n
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
