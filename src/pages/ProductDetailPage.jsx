import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { reviews } from '../data/mockData'
import { useCatalog } from '../context/CatalogContext'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useMarketplace } from '../context/MarketplaceContext'
import Badge from '../components/Badge'
import RatingStars from '../components/RatingStars'
import Button from '../components/Button'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { t } = useI18n()
  const location = useLocation()
  const { user } = useAuth()
  const { loading, getById } = useCatalog()
  const project = id ? getById(id) : null
  const { recordProductView, addToCart, toggleWishlist, isInWishlist, addToast } = useMarketplace()
  const liked = project ? isInWishlist(project.id) : false

  useEffect(() => {
    if (project) recordProductView(project.id)
  }, [project, recordProductView])

  if (!loading && !project) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{t('productDetail.notFound')}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{t('productDetail.removed')}</p>
        <Button as={Link} to="/" variant="primary" className="mt-8">
          {t('productDetail.back')}
        </Button>
      </div>
    )
  }

  if (loading && !project) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-3 px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" aria-hidden />
        <span className="text-slate-600 dark:text-slate-400">{t('common.loading')}</span>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav className="text-sm text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          {t('nav.home')}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800 dark:text-slate-200">{project.title}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-800">
            <img src={project.image} alt="" className="aspect-video w-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[project.image, project.image, project.image].map((src, i) => (
              <button
                key={i}
                type="button"
                className="overflow-hidden rounded-xl border border-slate-200 ring-offset-2 hover:ring-2 hover:ring-blue-500/30 dark:border-slate-700 dark:ring-offset-slate-950"
              >
                <img src={src} alt="" className="aspect-video w-full object-cover opacity-90 hover:opacity-100" />
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-left text-slate-300 dark:border-slate-800">
            <p className="text-xs font-medium uppercase tracking-wider text-violet-300">{t('productDetail.preview')}</p>
            <p className="mt-2 text-sm text-slate-400">{t('productDetail.previewSub')}</p>
            <div className="mt-4 flex aspect-video items-center justify-center rounded-xl bg-slate-800/80 text-slate-500">
              <span className="text-sm">{t('productDetail.playDemo')}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {project.bestSeller && <Badge tone="warning">{t('product.badgeBestSeller')}</Badge>}
            {project.isNew && <Badge tone="success">{t('product.badgeNew')}</Badge>}
            {typeof project.listPrice === 'number' && project.listPrice > project.price && (
              <Badge tone="warning">{t('product.badgeSale')}</Badge>
            )}
            {project.price === 0 && <Badge tone="success">{t('product.badgeFree')}</Badge>}
            {project.tags.map((tag) => (
              <Badge key={tag} tone="primary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl dark:text-white">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <RatingStars value={project.rating} count={project.reviewCount} />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {project.reviewCount} {t('productDetail.reviewsCountSuffix')}
            </span>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">{project.description}</p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t('productDetail.tech')}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg bg-white px-3 py-1 text-sm font-medium text-slate-700 ring-1 ring-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:ring-slate-700"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t('productDetail.features')}
            </h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/90 to-violet-50/90 p-6 dark:border-violet-900/40 dark:from-slate-900 dark:to-slate-900">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t('productDetail.license')}</p>
              {typeof project.listPrice === 'number' && project.listPrice > project.price && project.price > 0 && (
                <p className="text-lg text-slate-400 line-through dark:text-slate-500">
                  ${project.listPrice}
                  <span className="font-normal">.00</span>
                </p>
              )}
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {project.price === 0 ? (
                  t('product.free')
                ) : (
                  <>
                    ${project.price}
                    <span className="text-lg font-normal text-slate-500 dark:text-slate-400">.00</span>
                  </>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => addToast(t('productDetail.demo'), 'info')}
              >
                {t('productDetail.demo')}
              </Button>
              <Button type="button" variant="outline" onClick={() => toggleWishlist(project.id)}>
                {liked ? t('productDetail.saved') : t('productDetail.wishlist')}
              </Button>
              {user ? (
                <Button type="button" onClick={() => addToCart(project.id)}>
                  {t('product.addToCart')}
                </Button>
              ) : (
                <Button as={Link} to="/login" state={{ from: location }} variant="primary">
                  {t('auth.loginToShop')}
                </Button>
              )}
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-slate-500 sm:text-left dark:text-slate-400">
            <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
              {t('productDetail.live')}
            </a>
            {' · '}
            {t('productDetail.instant')}
          </p>
        </div>
      </div>

      <section className="mt-20 border-t border-slate-200 pt-14 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('productDetail.reviews')}</h2>
        <p className="mt-1 text-slate-600 dark:text-slate-400">{t('productDetail.reviewsSub')}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <RatingStars value={r.rating} className="mb-3" />
              <p className="text-slate-700 leading-relaxed dark:text-slate-300">&ldquo;{r.text}&rdquo;</p>
              <p className="mt-4 text-sm font-medium text-slate-900 dark:text-white">{r.user}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{r.date}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
