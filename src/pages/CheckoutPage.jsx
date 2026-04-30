import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { stripeReady, stripePublishableKey } from '../config/stripe'
import { useAuth } from '../context/AuthContext'
import { useCatalog } from '../context/CatalogContext'
import { useMarketplace } from '../context/MarketplaceContext'
import { useI18n } from '../context/I18nContext'
import { appendOrder } from '../utils/ordersStorage'
import { bankTransferDemo, buildBankQrDataUrl } from '../config/bankTransferDemo'
import Button from '../components/Button'
import Modal from '../components/Modal'

export default function CheckoutPage() {
  const { t } = useI18n()
  const { user } = useAuth()
  const { projects } = useCatalog()
  const { cartIds, clearCart, addToast } = useMarketplace()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)

  const items = useMemo(
    () => cartIds.map((id) => projects.find((p) => p.id === id)).filter(Boolean),
    [cartIds, projects],
  )

  const subtotal = useMemo(() => items.reduce((s, p) => s + p.price, 0), [items])

  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [card, setCard] = useState('')
  const [bankOpen, setBankOpen] = useState(false)

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-slate-600 dark:text-slate-400">{t('checkout.emptyRedirect')}</p>
        <Button as={Link} to="/cart" className="mt-6" variant="primary">
          {t('nav.cart')}
        </Button>
      </div>
    )
  }

  const handlePay = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      addToast(t('auth.errorFill'), 'error')
      return
    }
    setBusy(true)
    window.setTimeout(() => {
      appendOrder({
        email: user.email,
        items: items.map((p) => ({ id: p.id, title: p.title, price: p.price })),
        total: subtotal,
      })
      clearCart({ silent: true })
      addToast(t('checkout.orderDone'), 'success')
      setBusy(false)
      navigate('/profile', { replace: true })
    }, 600)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('checkout.title')}</h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">{t('checkout.subtitle')}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('checkout.order')}
          </h2>
          <ul className="mt-4 space-y-4">
            {items.map((p) => (
              <li key={p.id} className="flex justify-between gap-3 text-sm">
                <span className="font-medium text-slate-900 dark:text-white line-clamp-2">{p.title}</span>
                <span className="shrink-0 text-slate-600 dark:text-slate-400">
                  {p.price === 0 ? t('product.free') : `$${p.price}`}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white">
              <span>{t('cart.subtotal')}</span>
              <span>${subtotal}.00</span>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('checkout.billing')}
          </h2>
          <form className="mt-4 space-y-4" onSubmit={handlePay}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="co-name">
                {t('checkout.fullName')}
              </label>
              <input
                id="co-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="co-email">
                {t('checkout.email')}
              </label>
              <input
                id="co-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="co-card">
                {t('checkout.cardHint')}
              </label>
              <input
                id="co-card"
                value={card}
                onChange={(e) => setCard(e.target.value)}
                placeholder={t('checkout.cardPlaceholder')}
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                autoComplete="off"
              />
            </div>
            <Button type="button" variant="secondary" className="w-full" onClick={() => setBankOpen(true)}>
              {t('checkout.bankOpen')}
            </Button>
            <Button type="submit" className="w-full" size="lg" disabled={busy}>
              {busy ? '…' : t('checkout.payDemo')}
            </Button>
          </form>

          <Modal
            open={bankOpen}
            onClose={() => setBankOpen(false)}
            title={t('checkout.bankTitle')}
            closeLabel={t('common.close')}
            footer={
              <Button type="button" variant="secondary" onClick={() => setBankOpen(false)}>
                {t('common.close')}
              </Button>
            }
          >
            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('checkout.bankIntro')}</p>
              <div className="flex justify-center rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                <img
                  src={buildBankQrDataUrl(bankTransferDemo.accountNumber, subtotal)}
                  alt=""
                  width={160}
                  height={160}
                  className="rounded-lg"
                />
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <th className="bg-slate-50 px-3 py-2 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {t('checkout.bankColBank')}
                      </th>
                      <td className="px-3 py-2 text-slate-900 dark:text-white">{bankTransferDemo.bankName}</td>
                    </tr>
                    <tr>
                      <th className="bg-slate-50 px-3 py-2 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {t('checkout.bankColAccount')}
                      </th>
                      <td className="px-3 py-2">
                        <span className="font-mono text-slate-900 dark:text-white">{bankTransferDemo.accountNumber}</span>
                        <button
                          type="button"
                          className="ml-2 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                          onClick={() => {
                            void navigator.clipboard?.writeText(bankTransferDemo.accountNumber)
                            addToast(t('checkout.bankCopied'), 'success')
                          }}
                        >
                          {t('checkout.bankCopy')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-slate-50 px-3 py-2 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {t('checkout.bankColHolder')}
                      </th>
                      <td className="px-3 py-2 text-slate-900 dark:text-white">{bankTransferDemo.accountHolder}</td>
                    </tr>
                    <tr>
                      <th className="bg-slate-50 px-3 py-2 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {t('checkout.bankColAmount')}
                      </th>
                      <td className="px-3 py-2 font-semibold text-slate-900 dark:text-white">${subtotal}.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="list-inside list-disc space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <li>{t('checkout.bankStep1')}</li>
                <li>{t('checkout.bankStep2')}</li>
                <li>{t('checkout.bankStep3')}</li>
              </ul>
              <p className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-900 dark:bg-blue-950/50 dark:text-blue-200">
                {t('checkout.bankAfterPay', { contact: bankTransferDemo.supportNote })}
              </p>
            </div>
          </Modal>

          <div
            className={`mt-6 rounded-xl border p-4 text-sm ${
              stripeReady
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100'
                : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400'
            }`}
          >
            <p className="font-semibold text-slate-900 dark:text-white">{t('checkout.stripeTitle')}</p>
            <p className="mt-2 leading-relaxed">
              {stripeReady ? t('checkout.stripeKeyOn') : t('checkout.stripeKeyOff')}
            </p>
            {stripeReady && stripePublishableKey.length > 8 && (
              <p className="mt-2 font-mono text-xs opacity-80 break-all">
                …{stripePublishableKey.slice(-6)}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
