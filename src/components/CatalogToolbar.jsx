import { useI18n } from '../context/I18nContext'

export default function CatalogToolbar({
  sortBy,
  onSortChange,
  minRating,
  onMinRatingChange,
  maxPrice,
  onMaxPriceChange,
  className = '',
}) {
  const { t } = useI18n()

  const sortOptions = [
    { id: 'featured', label: t('catalog.sortFeatured') },
    { id: 'rating', label: t('catalog.sortRating') },
    { id: 'price-asc', label: t('catalog.sortPriceAsc') },
    { id: 'price-desc', label: t('catalog.sortPriceDesc') },
    { id: 'new', label: t('catalog.sortNew') },
  ]

  const ratingOptions = [
    { id: '0', label: t('catalog.ratingAny') },
    { id: '4', label: t('catalog.rating4') },
    { id: '4.5', label: t('catalog.rating45') },
  ]

  const priceOptions = [
    { id: 'any', label: t('catalog.priceAny') },
    { id: '30', label: t('catalog.price30') },
    { id: '50', label: t('catalog.price50') },
  ]

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 ${className}`}
    >
      <label className="flex min-w-[160px] flex-1 flex-col gap-1 text-xs font-medium whitespace-nowrap text-slate-500 dark:text-slate-400">
        {t('catalog.sort')}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        >
          {sortOptions.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex min-w-[140px] flex-1 flex-col gap-1 text-xs font-medium whitespace-nowrap text-slate-500 dark:text-slate-400">
        {t('catalog.minRating')}
        <select
          value={String(minRating)}
          onChange={(e) => onMinRatingChange(Number(e.target.value))}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        >
          {ratingOptions.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex min-w-[140px] flex-1 flex-col gap-1 text-xs font-medium whitespace-nowrap text-slate-500 dark:text-slate-400">
        {t('catalog.price')}
        <select
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        >
          {priceOptions.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
