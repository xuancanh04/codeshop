import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useI18n } from '../../context/I18nContext'
import { SITE_LOGO_ALT, SITE_LOGO_SRC } from '../../config/branding'

const linkClass = ({ isActive }) =>
  `flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-800 dark:text-violet-300 dark:ring-slate-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/80 dark:hover:text-white'
  }`

export default function AdminLayout() {
  const { user } = useAuth()
  const { t } = useI18n()

  return (
    <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex min-w-0 items-center gap-2 text-slate-900 dark:text-white">
            <img
              src={SITE_LOGO_SRC}
              alt={SITE_LOGO_ALT}
              width={340}
              height={64}
              draggable={false}
              className="h-14 w-auto max-h-14 max-w-[min(340px,58vw)] shrink-0 object-contain object-left dark:opacity-[0.98]"
            />
            <span className="shrink-0 whitespace-nowrap font-semibold">{t('admin.brand')}</span>
            {user?.email && (
              <span className="hidden min-w-0 max-w-[min(220px,40vw)] truncate text-xs font-normal text-slate-500 dark:text-slate-400 sm:inline">
                · {user.email}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/"
            className="shrink-0 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            {t('admin.navBack')}
          </NavLink>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:px-8">
        <aside className="w-full shrink-0 lg:w-56">
          <nav className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:pb-0">
            <NavLink to="/admin/products" className={linkClass}>
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {t('admin.navProducts')}
            </NavLink>
            <NavLink to="/admin/users" className={linkClass}>
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {t('admin.navUsers')}
            </NavLink>
            <NavLink to="/admin/orders" className={linkClass}>
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {t('admin.navOrders')}
            </NavLink>
          </nav>
        </aside>
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
