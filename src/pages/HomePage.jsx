import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { categories, isOnSale } from '../data/mockData'
import { useCatalog } from '../context/CatalogContext'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useMarketplace } from '../context/MarketplaceContext'
import SearchBar from '../components/SearchBar'
import CategoryPills from '../components/CategoryPills'
import ProductCard from '../components/ProductCard'
import CatalogToolbar from '../components/CatalogToolbar'
import Button from '../components/Button'
import FlashSaleCountdown from '../components/FlashSaleCountdown'
import WhyChooseSection from '../components/WhyChooseSection'
import TestimonialsHomeSection from '../components/TestimonialsHomeSection'
import CategoriesAndServicesSection from '../components/CategoriesAndServicesSection'

const SORT_OPTS = ['featured', 'rating', 'price-asc', 'price-desc', 'new']

function sortProjects(list, sortBy) {
  const copy = [...list]
  switch (sortBy) {
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating)
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'new':
      return copy.sort((a, b) => {
        if (a.isNew !== b.isNew) return b.isNew ? 1 : -1
        return b.rating - a.rating
      })
    case 'featured':
    default:
      return copy.sort((a, b) => {
        if (a.bestSeller !== b.bestSeller) return b.bestSeller ? 1 : -1
        return b.rating - a.rating
      })
  }
}

export default function HomePage() {
  const { t } = useI18n()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { projects, loading, error, refresh, getById } = useCatalog()
  const { user } = useAuth()
  const { recentIds } = useMarketplace()

  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
  const [sortBy, setSortBy] = useState(() => {
    const s = searchParams.get('sort')
    return SORT_OPTS.includes(s) ? s : 'featured'
  })
  const [minRating, setMinRating] = useState(() => {
    const m = searchParams.get('min')
    if (m === '4') return 4
    if (m === '4.5') return 4.5
    return 0
  })
  const [maxPrice, setMaxPrice] = useState(() => {
    const x = searchParams.get('max')
    return x === '30' || x === '50' ? x : 'any'
  })

  useEffect(() => {
    const anchorId = location.hash.replace(/^#/, '')
    if (!anchorId) return
    const scrollTarget = () => {
      const el = document.getElementById(anchorId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    const tid1 = window.setTimeout(scrollTarget, 100)
    const tid2 = window.setTimeout(scrollTarget, 350)
    return () => {
      window.clearTimeout(tid1)
      window.clearTimeout(tid2)
    }
  }, [location.pathname, location.hash])

  const categoryId = useMemo(() => {
    const c = searchParams.get('cat')
    return c && categories.some((x) => x.id === c) ? c : null
  }, [searchParams])

  const setCategoryId = useCallback(
    (next) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev)
          if (next == null) p.delete('cat')
          else p.set('cat', next)
          return p
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  useEffect(() => {
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev)
        const qt = query.trim()
        if (qt) p.set('q', qt)
        else p.delete('q')
        if (sortBy !== 'featured') p.set('sort', sortBy)
        else p.delete('sort')
        if (minRating > 0) p.set('min', minRating === 4.5 ? '4.5' : String(minRating))
        else p.delete('min')
        if (maxPrice !== 'any') p.set('max', maxPrice)
        else p.delete('max')
        return p.toString() === prev.toString() ? prev : p
      },
      { replace: true },
    )
  }, [query, sortBy, minRating, maxPrice, setSearchParams])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = projects.filter((p) => {
      const catOk = !categoryId || p.category === categoryId
      if (!catOk) return false
      if (p.rating < minRating) return false
      if (maxPrice === '30' && p.price > 30) return false
      if (maxPrice === '50' && p.price > 50) return false
      if (!q) return true
      const blob = `${p.title} ${p.shortDescription} ${p.tags.join(' ')} ${p.technologies.join(' ')}`.toLowerCase()
      return blob.includes(q)
    })
    return sortProjects(list, sortBy)
  }, [projects, query, categoryId, sortBy, minRating, maxPrice])

  const featured = useMemo(
    () => (projects.length ? sortProjects([...projects], 'featured').slice(0, 3) : []),
    [projects],
  )

  const flashSaleProjects = useMemo(() => projects.filter(isOnSale).slice(0, 4), [projects])

  const newestProjects = useMemo(() => {
    const copy = [...projects]
    copy.sort((a, b) => {
      if (a.isNew !== b.isNew) return b.isNew ? 1 : -1
      return b.rating - a.rating
    })
    return copy.slice(0, 6)
  }, [projects])

  const freeProjects = useMemo(() => projects.filter((p) => p.price === 0).slice(0, 6), [projects])

  const recentProjects = useMemo(
    () => recentIds.map((id) => getById(id)).filter(Boolean),
    [recentIds, getById],
  )

  if (loading && projects.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" aria-hidden />
        <p className="text-slate-600 dark:text-slate-400">{t('common.loading')}</p>
      </div>
    )
  }

  if (error && projects.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="text-slate-600 dark:text-slate-400">{t('common.error')}</p>
        <Button type="button" className="mt-4" variant="primary" onClick={refresh}>
          {t('common.retry')}
        </Button>
      </div>
    )
  }

  return (
    <div className="min-w-0 overflow-x-clip">
      <section className="relative overflow-hidden border-b border-slate-100/80 bg-gradient-to-b from-slate-50/50 via-white to-blue-50/20 py-8 dark:border-white/[0.06] dark:from-[#08080c] dark:via-[#0e0c18] dark:to-[#08080c]">
        {/* Glow & Radial Background Orbs */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/4 h-[min(90vw,36rem)] w-[min(90vw,36rem)] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.22)_0%,rgba(168,85,247,0.18)_40%,transparent_70%)] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-[#a000ff]/15"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-[#0084ff]/15"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Top Banner Tag */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-md transition-transform hover:scale-105 dark:border-blue-500/30 dark:bg-blue-950/50 dark:text-blue-300">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
              <span className="tracking-wide uppercase">{t('home.kicker')}</span>
              <span className="text-blue-400 dark:text-blue-500">•</span>
              <span className="font-normal text-slate-600 dark:text-slate-300">Hot Deals 2026</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-gradient-hero mx-auto mt-6 max-w-4xl text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.15]">
            {t('home.title')}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            {t('home.subtitle')}
          </p>

          {/* Floating Search Container */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="glass-card-hero rounded-2xl p-2 shadow-xl ring-1 ring-slate-900/5 transition duration-300 focus-within:ring-2 focus-within:ring-blue-500/40">
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder={t('home.searchPlaceholder')}
              />
            </div>
            <p className="mt-2.5 text-center text-xs text-slate-500 dark:text-slate-400">
              ⚡ {t('home.urlShare')}
            </p>
          </div>

          {/* Feature Highlights Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600 sm:text-sm dark:text-slate-300">
            <div className="flex items-center gap-1.5 rounded-lg bg-slate-100/70 px-3 py-1.5 backdrop-blur-sm dark:bg-white/[0.04]">
              <span className="text-emerald-500">✓</span> Bản quyền vĩnh viễn
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-slate-100/70 px-3 py-1.5 backdrop-blur-sm dark:bg-white/[0.04]">
              <span className="text-blue-500">✓</span> Hỗ trợ cài đặt 1:1
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-slate-100/70 px-3 py-1.5 backdrop-blur-sm dark:bg-white/[0.04]">
              <span className="text-violet-500">✓</span> Cập nhật liên tục
            </div>
          </div>

          {/* Category Filter Pills */}
          <div id="categories" className="mx-auto mt-10 max-w-3xl scroll-mt-24">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {t('home.categories')}
            </p>
            <CategoryPills items={categories} activeId={categoryId} onSelect={setCategoryId} className="justify-center" />
          </div>
        </div>
      </section>

      <CategoriesAndServicesSection categories={categories} projects={projects} />

      {flashSaleProjects.length > 0 && <FlashSaleCountdown projects={flashSaleProjects} />}

      {recentProjects.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{t('home.recent')}</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t('home.recentSub')}</p>
            </div>
            <Link
              to={user ? '/profile' : '/login'}
              className="shrink-0 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {user ? t('nav.profile') : t('nav.login')}
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentProjects.map((p) => (
              <ProductCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{t('home.featured')}</h2>
            <p className="mt-1 text-slate-600 dark:text-slate-400">{t('home.featuredSub')}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{t('home.newest')}</h2>
            <p className="mt-1 text-slate-600 dark:text-slate-400">{t('home.newestSub')}</p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newestProjects.map((p) => (
              <ProductCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {freeProjects.length > 0 && (
        <section className="border-t border-slate-200 bg-emerald-50/30 dark:border-slate-800 dark:bg-emerald-950/10">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{t('home.free')}</h2>
              <p className="mt-1 text-slate-600 dark:text-slate-400">{t('home.freeSub')}</p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {freeProjects.map((p) => (
                <ProductCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        id="catalog"
        className="scroll-mt-28 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{t('home.all')}</h2>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                {filtered.length}{' '}
                {filtered.length === 1 ? t('home.resultSingular') : t('home.results')}
                {query.trim() && ` · ${t('home.forQuery')} “${query.trim()}”`}
                {categoryId && ` · ${t('home.inCategory')} ${categories.find((c) => c.id === categoryId)?.label ?? categoryId}`}
              </p>
            </div>
          </div>
          <CatalogToolbar
            className="mt-6"
            sortBy={sortBy}
            onSortChange={setSortBy}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
          />
          {filtered.length === 0 ? (
            <p className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
              {t('home.empty')}
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <WhyChooseSection />
      <TestimonialsHomeSection />
    </div>
  )
}
