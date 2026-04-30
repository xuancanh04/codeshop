import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCatalog } from '../context/CatalogContext'
import { useI18n } from '../context/I18nContext'
import { getOrdersForEmail } from '../utils/ordersStorage'
import Button from '../components/Button'
import Badge from '../components/Badge'

function ProfileForm({ user, t, updateProfile, isAdmin }) {
  const [name, setName] = useState(user.name ?? '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile({
      name,
      currentPassword: newPassword ? currentPassword : undefined,
      newPassword: newPassword || undefined,
    })
    if (newPassword) {
      setCurrentPassword('')
      setNewPassword('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div>
        <label htmlFor="pf-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {t('profile.displayName')}
        </label>
        <input
          id="pf-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          autoComplete="name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('profile.email')}</label>
        <input
          readOnly
          value={user.email}
          className="mt-1.5 w-full cursor-not-allowed rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
        />
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">{t('profile.emailHint')}</p>
      </div>
      <div>
        <label htmlFor="pf-cur" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {t('profile.currentPassword')}
        </label>
        <input
          id="pf-cur"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="pf-new" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {t('profile.newPassword')}
        </label>
        <input
          id="pf-new"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">{t('profile.newPasswordHint')}</p>
      </div>
      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit">{t('profile.save')}</Button>
        {isAdmin ? (
          <Button as={Link} to="/dashboard" variant="secondary">
            {t('nav.dashboard')}
          </Button>
        ) : (
          <Button as={Link} to="/" variant="secondary">
            {t('dashboard.browse')}
          </Button>
        )}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500">{t('profile.note')}</p>
    </form>
  )
}

function ProfilePurchases({ user, t, getById }) {
  const orders = useMemo(() => (user ? getOrdersForEmail(user.email) : []), [user])

  const purchased = useMemo(() => {
    const ids = [...new Set(orders.flatMap((o) => (o.items || []).map((i) => i.id)))]
    return ids.map((id) => getById(id)).filter(Boolean)
  }, [orders, getById])

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('profile.purchases')}</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('profile.purchasesSub')}</p>
      {purchased.length === 0 ? (
        <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">{t('dashboard.emptyPurchases')}</p>
      ) : (
        <ul className="mt-6 divide-y divide-slate-100 dark:divide-slate-800">
          {purchased.map((p) => (
            <li
              key={p.id}
              className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex gap-4">
                <img src={p.image} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{p.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {p.price === 0 ? t('product.free') : `$${p.price}`} · {t('dashboard.license')}
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
              <Button as={Link} to={`/product/${p.id}`} variant="ghost" size="sm">
                {t('dashboard.details')}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function ProfilePage() {
  const { t } = useI18n()
  const { user, updateProfile, isAdmin } = useAuth()
  const { getById } = useCatalog()

  if (!user) {
    return null
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('profile.title')}</h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">{t('profile.subtitle')}</p>

      <ProfilePurchases user={user} t={t} getById={getById} />

      <ProfileForm
        key={`${user.email}:${user.name}`}
        user={user}
        t={t}
        updateProfile={updateProfile}
        isAdmin={isAdmin}
      />
    </div>
  )
}
