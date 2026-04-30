import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const MarketplaceContext = createContext(null)

export function MarketplaceProvider({ children }) {
  const [cartIds, setCartIds] = useLocalStorage('cm-cart', [])
  const [wishlistIds, setWishlistIds] = useLocalStorage('cm-wishlist', [])
  const [recentIds, setRecentIds] = useLocalStorage('cm-recent', [])
  const [theme, setTheme] = useLocalStorage('cm-theme', () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  )

  const [toasts, setToasts] = useState([])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [setTheme])

  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((x) => x.id !== id))
  }, [])

  const addToast = useCallback((message, type = 'info') => {
    const id = crypto.randomUUID()
    setToasts((list) => [...list, { id, message, type }])
    window.setTimeout(() => {
      setToasts((list) => list.filter((x) => x.id !== id))
    }, 3800)
  }, [])

  const addToCart = useCallback(
    (projectId) => {
      let added = false
      setCartIds((prev) => {
        if (prev.includes(projectId)) return prev
        added = true
        return [...prev, projectId]
      })
      if (added) addToast('Added to cart', 'success')
      else addToast('Already in your cart', 'info')
    },
    [setCartIds, addToast],
  )

  const removeFromCart = useCallback(
    (projectId) => {
      setCartIds((prev) => prev.filter((id) => id !== projectId))
      addToast('Removed from cart', 'info')
    },
    [setCartIds, addToast],
  )

  const clearCart = useCallback(
    (opts) => {
      setCartIds([])
      if (!opts?.silent) addToast('Cart cleared', 'info')
    },
    [setCartIds, addToast],
  )

  const toggleWishlist = useCallback(
    (projectId) => {
      let wasRemoved = false
      setWishlistIds((prev) => {
        if (prev.includes(projectId)) {
          wasRemoved = true
          return prev.filter((id) => id !== projectId)
        }
        return [...prev, projectId]
      })
      if (wasRemoved) addToast('Removed from wishlist', 'info')
      else addToast('Saved to wishlist', 'success')
    },
    [setWishlistIds, addToast],
  )

  const recordProductView = useCallback(
    (projectId) => {
      setRecentIds((prev) => [projectId, ...prev.filter((id) => id !== projectId)].slice(0, 10))
    },
    [setRecentIds],
  )

  const isInWishlist = useCallback((id) => wishlistIds.includes(id), [wishlistIds])
  const isInCart = useCallback((id) => cartIds.includes(id), [cartIds])

  const value = useMemo(
    () => ({
      cartIds,
      wishlistIds,
      recentIds,
      theme,
      toasts,
      toggleTheme,
      addToCart,
      removeFromCart,
      clearCart,
      toggleWishlist,
      recordProductView,
      isInWishlist,
      isInCart,
      addToast,
      dismissToast,
      cartCount: cartIds.length,
      wishlistCount: wishlistIds.length,
    }),
    [
      cartIds,
      wishlistIds,
      recentIds,
      theme,
      toasts,
      toggleTheme,
      addToCart,
      removeFromCart,
      clearCart,
      toggleWishlist,
      recordProductView,
      isInWishlist,
      isInCart,
      addToast,
      dismissToast,
    ],
  )

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>
}

// Hook is intentionally exported next to the provider for this demo app.
// eslint-disable-next-line react-refresh/only-export-components -- useMarketplace
export function useMarketplace() {
  const ctx = useContext(MarketplaceContext)
  if (!ctx) throw new Error('useMarketplace must be used within MarketplaceProvider')
  return ctx
}
