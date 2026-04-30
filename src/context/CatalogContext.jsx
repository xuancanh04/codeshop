import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  startTransition,
} from 'react'
import { fetchCatalog } from '../api/catalogApi'

const CatalogContext = createContext(null)

export function CatalogProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchCatalog()
      .then((res) => {
        setProjects(res.data)
        setLoading(false)
      })
      .catch((e) => {
        setError(e instanceof Error ? e : new Error(String(e)))
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    startTransition(() => {
      load()
    })
  }, [load])

  const getById = useCallback(
    (id) => projects.find((p) => p.id === id) ?? null,
    [projects],
  )

  const value = useMemo(
    () => ({
      projects,
      loading,
      error,
      refresh: load,
      getById,
    }),
    [projects, loading, error, load, getById],
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- useCatalog
export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider')
  return ctx
}
