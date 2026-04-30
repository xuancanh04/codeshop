import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCatalog } from '../context/CatalogContext'
import { useI18n } from '../context/I18nContext'
import { getOrdersForEmail } from '../utils/ordersStorage'
import Button from '../components/Button'
import Badge from '../components/Badge'

export default function DashboardPage() {
  const { t } = useI18n()
  const { user } = useAuth()
  const { getById } = useCatalog()

  const orders = useMemo(() => (user ? getOrdersForEmail(user.email) : []), [user])

  const purchased = useMemo(() => {
    const ids = [...new Set(orders.flatMap((o) => o.items.map((i) => i.id)))]
    return ids.map((id) => getById(id)).filter(Boolean)
  }, [orders, getById])

  const history = useMemo(() => {
    const rows = []
    orders.forEach((o) => {
      o.items.forEach((item) => {
        rows.push({
          id: `${o.id}-${item.id}`,
          name: item.title,
          date: o.at?.slice(0, 10) ?? '',
          version: 'v1.0.0',
        })
      })
    })
    return rows.slice(0, 12)
  }, [orders])

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
    : '—'

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('dashboard.title')}</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">{t('dashboard.subtitle')}</p>
        </div>
        <Button as={Link} to="/" variant="secondary">
          {t('dashboard.browse')}
        </Button>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('dashboard.purchased')}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('dashboard.purchasedSub')}</p>
          {purchased.length === 0 ? (
            <p className="mt-8 text-sm text-slate-600 dark:text-slate-400">{t('dashboard.emptyPurchases')}</p>
          ) : (
            <ul className="mt-6 divide-y divide-slate-100 dark:divide-slate-800">
              {purchased.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex gap-4">
                    <img
                      src={p.image}
                      alt=""
                      className="h-16 w-24 shrink-0 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{p.title}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        ${p.price} · {t('dashboard.license')}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} tone="primary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button as={Link} to={`/product/${p.id}`} variant="ghost" size="sm">
                      {t('dashboard.details')}
                    </Button>
                    <Button size="sm">{t('dashboard.downloadZip')}</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-violet-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('dashboard.account')}</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{user?.name}</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">{t('auth.email')}</dt>
              <dd className="font-medium text-slate-900 dark:text-white">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">{t('dashboard.memberSince')}</dt>
              <dd className="font-medium text-slate-900 dark:text-white">{memberSince}</dd>
            </div>
          </dl>
          <Button as={Link} to="/profile" variant="outline" className="mt-6 w-full" size="sm">
            {t('dashboard.editProfile')}
          </Button>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('dashboard.downloadHistory')}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('dashboard.downloadHistorySub')}</p>
        </div>
        {history.length === 0 ? (
          <p className="px-6 py-10 text-sm text-slate-600 dark:text-slate-400">{t('dashboard.emptyPurchases')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3 font-medium">{t('dashboard.project')}</th>
                  <th className="px-6 py-3 font-medium">{t('dashboard.version')}</th>
                  <th className="px-6 py-3 font-medium">{t('dashboard.date')}</th>
                  <th className="px-6 py-3 font-medium text-right">{t('dashboard.action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {history.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.name}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{row.version}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{row.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button type="button" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {t('dashboard.downloadAgain')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
