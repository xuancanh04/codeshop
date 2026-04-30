import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'
import { useI18n } from '../context/I18nContext'
import { useMarketplace } from '../context/MarketplaceContext'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'

export default function WishlistPage() {
  const { t } = useI18n()
  const { getById } = useCatalog()
  const { wishlistIds, toggleWishlist } = useMarketplace()

  const saved = useMemo(
    () => wishlistIds.map((id) => getById(id)).filter(Boolean),
    [wishlistIds, getById],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('wishlist.title')}</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">{t('wishlist.subtitle')}</p>
        </div>
        <Button as={Link} to="/" variant="secondary">
          {t('wishlist.discover')}
        </Button>
      </div>

      {saved.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
          <p className="text-slate-600 dark:text-slate-400">{t('wishlist.empty')}</p>
          <Button as={Link} to="/" className="mt-6" variant="primary">
            {t('wishlist.browse')}
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((p) => (
            <div key={p.id} className="relative">
              <button
                type="button"
                onClick={() => toggleWishlist(p.id)}
                className="absolute right-4 top-4 z-20 rounded-full bg-white/95 p-2 text-rose-500 shadow-md ring-1 ring-slate-200 hover:bg-rose-50 dark:bg-slate-900/95 dark:ring-slate-700"
                aria-label={t('wishlist.remove')}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <ProductCard project={p} hideWishlistButton />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
