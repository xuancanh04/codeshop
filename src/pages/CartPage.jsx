import { Link } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'
import { useI18n } from '../context/I18nContext'
import { useMarketplace } from '../context/MarketplaceContext'
import Button from '../components/Button'

export default function CartPage() {
  const { t } = useI18n()
  const { projects } = useCatalog()
  const { cartIds, removeFromCart, clearCart } = useMarketplace()

  const items = cartIds.map((id) => projects.find((p) => p.id === id)).filter(Boolean)

  const subtotal = items.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('cart.title')}</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            {items.length} {items.length === 1 ? t('cart.item') : t('cart.items')} · {t('cart.subtitle')}
          </p>
        </div>
        {items.length > 0 && (
          <Button type="button" variant="ghost" onClick={clearCart}>
            {t('cart.clear')}
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
          <p className="text-slate-600 dark:text-slate-400">{t('cart.empty')}</p>
          <Button as={Link} to="/" className="mt-6" variant="primary">
            {t('cart.browse')}
          </Button>
        </div>
      ) : (
        <ul className="mt-10 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {items.map((p) => (
            <li
              key={p.id}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex gap-4">
                <img
                  src={p.image}
                  alt=""
                  className="h-20 w-28 shrink-0 rounded-xl object-cover"
                />
                <div>
                  <Link
                    to={`/product/${p.id}`}
                    className="font-semibold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                  >
                    {p.title}
                  </Link>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {p.price === 0 ? t('product.free') : `$${p.price}.00 ${t('cart.each')}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:shrink-0">
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {p.price === 0 ? t('product.free') : `$${p.price}`}
                </span>
                <Button type="button" variant="secondary" size="sm" onClick={() => removeFromCart(p.id)}>
                  {t('cart.remove')}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="mt-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/90 to-violet-50/90 p-6 dark:border-violet-900/40 dark:from-slate-900 dark:to-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t('cart.subtotal')}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {subtotal === 0 ? t('product.free') : `$${subtotal}.00`}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button as={Link} to="/" variant="secondary">
                {t('cart.continue')}
              </Button>
              <Button as={Link} to="/checkout" variant="primary">
                {t('cart.checkout')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
