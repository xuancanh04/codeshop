import { Link, useLocation } from 'react-router-dom'
import Badge from './Badge'
import RatingStars from './RatingStars'
import Button from './Button'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useMarketplace } from '../context/MarketplaceContext'

export default function ProductCard({ project, hideWishlistButton = false }) {
  const {
    id,
    title,
    shortDescription,
    price,
    listPrice,
    rating,
    reviewCount,
    image,
    tags,
    bestSeller,
    isNew,
  } = project
  const { t } = useI18n()
  const location = useLocation()
  const { user } = useAuth()
  const { toggleWishlist, addToCart, isInWishlist } = useMarketplace()
  const liked = isInWishlist(id)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50 transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-600/12 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:border-blue-800/60 dark:hover:shadow-blue-500/10">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {!hideWishlistButton && (
          <button
            type="button"
            onClick={() => toggleWishlist(id)}
            className={`
            absolute right-3 top-3 z-10 rounded-full p-2 shadow-md ring-1 transition hover:scale-105
            ${liked
              ? 'bg-rose-500 text-white ring-rose-400/50'
              : 'bg-white/95 text-slate-400 ring-slate-200/80 hover:text-blue-600 dark:bg-slate-900/95 dark:ring-slate-700 dark:hover:text-rose-400'}
          `}
            aria-label={liked ? t('product.wishlistRemove') : t('product.wishlistAdd')}
          >
            <svg className="h-5 w-5" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={liked ? 0 : 2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
        <div className={`absolute left-3 top-3 flex flex-wrap gap-1.5 ${hideWishlistButton ? '' : 'pr-12'}`}>
          {bestSeller && <Badge tone="warning">{t('product.badgeBestSeller')}</Badge>}
          {isNew && <Badge tone="success">{t('product.badgeNew')}</Badge>}
          {typeof listPrice === 'number' && listPrice > price && (
            <Badge tone="warning">{t('product.badgeSale')}</Badge>
          )}
          {price === 0 && <Badge tone="success">{t('product.badgeFree')}</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tagLabel) => (
            <Badge key={tagLabel} tone="primary">
              {tagLabel}
            </Badge>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 line-clamp-2 dark:text-white">
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
            {shortDescription}
          </p>
        </div>
        <RatingStars value={rating} count={reviewCount} />
        <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between dark:border-slate-800">
          <div className="min-w-0">
            {typeof listPrice === 'number' && listPrice > price && price > 0 && (
              <p className="text-sm text-slate-400 line-through dark:text-slate-500">
                ${listPrice}
                <span className="font-normal">.00</span>
              </p>
            )}
            <p
              className={`text-xl font-bold dark:text-white ${price === 0 ? 'text-emerald-700' : 'text-blue-800'}`}
            >
              {price === 0 ? (
                t('product.free')
              ) : (
                <>
                  ${price}
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400">.00</span>
                </>
              )}
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-end">
            <Button as={Link} to={`/product/${id}`} variant="secondary" size="sm" className="w-full sm:w-auto">
              {t('product.viewDetails')}
            </Button>
            {user ? (
              <>
                <Button type="button" variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => addToCart(id)}>
                  {t('product.addToCart')}
                </Button>
                <Button as={Link} to={`/product/${id}`} size="sm" className="w-full min-[400px]:col-span-2 sm:col-span-1 sm:w-auto">
                  {t('product.buyNow')}
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" state={{ from: location }} variant="outline" size="sm" className="w-full sm:w-auto">
                  {t('auth.loginToShop')}
                </Button>
                <Button as={Link} to="/login" state={{ from: location }} size="sm" className="w-full min-[400px]:col-span-2 sm:col-span-1 sm:w-auto">
                  {t('product.buyNow')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
