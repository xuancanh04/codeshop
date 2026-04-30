import { useState, useCallback } from 'react'

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw == null) return typeof fallback === 'function' ? fallback() : fallback
    return JSON.parse(raw)
  } catch {
    return typeof fallback === 'function' ? fallback() : fallback
  }
}

export function useLocalStorage(key, fallback) {
  const [state, setState] = useState(() => read(key, fallback))

  const setValue = useCallback(
    (valueOrUpdater) => {
      setState((prev) => {
        const next =
          typeof valueOrUpdater === 'function' ? valueOrUpdater(prev) : valueOrUpdater
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          /* ignore quota */
        }
        return next
      })
    },
    [key],
  )

  return [state, setValue]
}
