import { useMemo, useState } from 'react'
import { readAllOrders } from '../../utils/ordersStorage'
import { useI18n } from '../../context/I18nContext'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import Modal from '../../components/Modal'

export default function AdminOrdersPage() {
  const { t } = useI18n()
  const [tick, setTick] = useState(0)
  const [detail, setDetail] = useState(null)

  const orders = useMemo(() => {
    void tick
    return readAllOrders()
  }, [tick])

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('admin.ordersTitle')}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">{t('admin.dataSource')}</p>
        </div>
        <Button type="button" variant="secondary" onClick={() => setTick((n) => n + 1)}>
          {t('admin.refresh')}
        </Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {orders.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-600 dark:text-slate-400">{t('admin.ordersEmpty')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium lg:px-6">{t('admin.orderId')}</th>
                  <th className="px-4 py-3 font-medium">{t('admin.customer')}</th>
                  <th className="px-4 py-3 font-medium">{t('admin.products')}</th>
                  <th className="px-4 py-3 font-medium">{t('admin.colTotal')}</th>
                  <th className="px-4 py-3 font-medium">{t('admin.date')}</th>
                  <th className="px-4 py-3 font-medium">{t('admin.status')}</th>
                  <th className="px-4 py-3 font-medium text-right lg:px-6">{t('admin.colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {orders.map((o) => {
                  const titles = (o.items || []).map((i) => i.title).join(', ')
                  const short = titles.length > 80 ? `${titles.slice(0, 80)}…` : titles
                  const at = o.at ? o.at.slice(0, 19).replace('T', ' ') : '—'
                  return (
                    <tr key={o.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="px-4 py-4 font-mono text-xs text-slate-600 dark:text-slate-400 lg:px-6">
                        {String(o.id).slice(0, 8)}…
                      </td>
                      <td className="px-4 py-4 text-slate-900 dark:text-white">{o.email}</td>
                      <td className="max-w-[220px] px-4 py-4 text-slate-600 dark:text-slate-400">
                        <span className="line-clamp-2" title={titles}>
                          {short || '—'}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-400">
                          {(o.items || []).length} {t('admin.items')}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-medium text-slate-900 dark:text-white">${o.total}</td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{at}</td>
                      <td className="px-4 py-4">
                        <Badge tone="success">{t('admin.statusDemo')}</Badge>
                      </td>
                      <td className="px-4 py-4 text-right lg:px-6">
                        <Button variant="ghost" size="sm" type="button" onClick={() => setDetail(o)}>
                          {t('admin.viewDetails')}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={t('admin.orderDetailTitle')}
        closeLabel={t('common.close')}
        footer={
          <Button type="button" variant="secondary" onClick={() => setDetail(null)}>
            {t('common.close')}
          </Button>
        }
      >
        {detail ? (
          <div className="space-y-5 text-sm">
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('admin.orderId')}</dt>
                <dd className="mt-0.5 break-all font-mono text-xs text-slate-800 dark:text-slate-200">
                  {detail.id}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('admin.orderEmail')}</dt>
                <dd className="mt-0.5 text-slate-800 dark:text-slate-200">{detail.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('admin.orderPlaced')}</dt>
                <dd className="mt-0.5 text-slate-800 dark:text-slate-200">
                  {detail.at ? detail.at.replace('T', ' ').slice(0, 19) : '—'}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('admin.colTotal')}</dt>
                <dd className="mt-0.5 font-medium text-slate-900 dark:text-white">${detail.total}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('admin.status')}</dt>
                <dd className="mt-1">
                  <Badge tone="success">{t('admin.statusDemo')}</Badge>
                </dd>
              </div>
            </dl>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('admin.products')}</p>
              <ul className="mt-2 divide-y divide-slate-100 dark:divide-slate-800">
                {(detail.items || []).length === 0 ? (
                  <li className="py-2 text-slate-500">—</li>
                ) : (
                  (detail.items || []).map((item, i) => (
                    <li
                      key={`${detail.id}-${i}-${item.id ?? ''}`}
                      className="flex items-start justify-between gap-3 py-2.5"
                    >
                      <span className="text-slate-800 dark:text-slate-200">{item.title}</span>
                      <span className="shrink-0 font-medium text-slate-900 dark:text-white">
                        ${item.price}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
