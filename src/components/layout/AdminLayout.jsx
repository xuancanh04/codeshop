import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useI18n } from '../../context/I18nContext'
import BrandLogo from '../BrandLogo'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 dark:bg-violet-600 dark:shadow-violet-600/20'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
  }`

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const { t } = useI18n()

  return (
    <div className="flex min-h-svh bg-slate-100 dark:bg-slate-950">
      <aside className="sticky top-0 flex w-full shrink-0 flex-col border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:w-60 lg:min-h-svh lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-4 dark:border-slate-800 lg:flex-col lg:items-stretch lg:gap-3">
          <Link
            to="/admin"
            className="flex min-w-0 items-center gap-2 rounded-lg outline-none ring-offset-2 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
          >
            <BrandLogo size="sm" className="max-h-10 shrink-0 lg:max-h-11" />
          </Link>
          <p className="hidden text-xs font-semibold uppercase tracking-wide text-slate-500 lg:block dark:text-slate-400">
            {t('admin.brand')}
          </p>
        </div>

        <nav className="flex flex-1 flex-row gap-1 overflow-x-auto px-2 py-3 lg:flex-col lg:gap-0.5 lg:px-3 lg:py-4 [&::-webkit-scrollbar]:h-0">
          <NavLink to="/admin" end className={linkClass}>
            <svg className="h-5 w-5 shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z"
              />
            </svg>
            <span className="whitespace-nowrap">{t('admin.navDashboard')}</span>
          </NavLink>
          <NavLink to="/admin/products" className={linkClass}>
            <svg className="h-5 w-5 shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="whitespace-nowrap">{t('admin.navProducts')}</span>
          </NavLink>
          <NavLink to="/admin/users" className={linkClass}>
            <svg className="h-5 w-5 shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="whitespace-nowrap">{t('admin.navUsers')}</span>
          </NavLink>
          <NavLink to="/admin/orders" className={linkClass}>
            <svg className="h-5 w-5 shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="whitespace-nowrap">{t('admin.navOrders')}</span>
          </NavLink>
        </nav>

        <div className="mt-auto border-t border-slate-100 p-3 dark:border-slate-800">
          {user?.email && (
            <p className="mb-2 truncate px-1 text-xs text-slate-500 dark:text-slate-400" title={user.email}>
              {user.email}
            </p>
          )}
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-white/5"
            >
              {t('admin.navBack')}
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-lg px-3 py-2 text-center text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            >
              {t('nav.logout')}
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 overflow-x-hidden">
        <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('admin.brand')}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">{t('admin.demoPanelAccountHint')}</p>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
