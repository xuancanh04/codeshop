import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCatalog } from '../../context/CatalogContext'
import { useI18n } from '../../context/I18nContext'
import { readUsers } from '../../auth/authUsers'
import { readAllOrders } from '../../utils/ordersStorage'
import Button from '../../components/Button'
import Badge from '../../components/Badge'

export default function AdminDashboardPage() {
  const { t } = useI18n()
  const { projects } = useCatalog()
  const [tick, setTick] = useState(0)

  const stats = useMemo(() => {
    void tick
    const users = readUsers()
    const orders = readAllOrders()
    return {
      products: projects.length,
      users: users.length,
      orders: orders.length,
      recent: orders.slice(0, 5),
    }
  }, [projects, tick])

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{t('admin.dashboardTitle')}</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t('admin.dashboardSubtitle')}</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">{t('admin.dataSource')}</p>
        </div>
        <Button type="button" variant="secondary" onClick={() => setTick((n) => n + 1)}>
          {t('admin.refresh')}
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('admin.statProducts')}
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-slate-900 dark:text-white">{stats.products}</p>
          <Button as={Link} to="/admin/products" className="mt-4" variant="secondary" size="sm">
            {t('admin.manageProducts')}
          </Button>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('admin.statUsers')}
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-slate-900 dark:text-white">{stats.users}</p>
          <Button as={Link} to="/admin/users" className="mt-4" variant="secondary" size="sm">
            {t('admin.manageUsers')}
          </Button>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('admin.statOrders')}
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-slate-900 dark:text-white">{stats.orders}</p>
          <Button as={Link} to="/admin/orders" className="mt-4" variant="secondary" size="sm">
            {t('admin.viewAllOrders')}
          </Button>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('admin.recentOrders')}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('admin.recentOrdersSub')}</p>
          </div>
          <Button as={Link} to="/admin/orders" variant="outline" size="sm">
            {t('admin.viewAllOrders')}
          </Button>
        </div>
        {stats.recent.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-600 dark:text-slate-400">{t('admin.ordersEmpty')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">{t('admin.orderId')}</th>
                  <th className="px-5 py-3 font-medium">{t('admin.customer')}</th>
                  <th className="px-5 py-3 font-medium">{t('admin.colTotal')}</th>
                  <th className="px-5 py-3 font-medium">{t('admin.date')}</th>
                  <th className="px-5 py-3 font-medium">{t('admin.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {stats.recent.map((o) => {
                  const at = o.at ? o.at.slice(0, 19).replace('T', ' ') : '—'
                  return (
                    <tr key={o.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="px-5 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                        {String(o.id).slice(0, 8)}…
                      </td>
                      <td className="px-5 py-3 text-slate-900 dark:text-white">{o.email}</td>
                      <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">${o.total}</td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{at}</td>
                      <td className="px-5 py-3">
                        <Badge tone="success">{t('admin.statusDemo')}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
