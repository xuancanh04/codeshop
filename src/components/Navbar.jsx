import { useCallback, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useMarketplace } from '../context/MarketplaceContext'
import LanguageToggle from './LanguageToggle'
import BrandLogo from './BrandLogo'

const navLinkClass = ({ isActive }) =>
  `inline-flex shrink-0 items-center whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium transition-colors lg:px-3 lg:text-sm ${
    isActive
      ? 'bg-blue-50 text-blue-700 dark:bg-violet-950/70 dark:text-blue-400'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white'
  }`

const sectionNavClass =
  'inline-flex shrink-0 items-center whitespace-nowrap rounded-lg px-2.5 py-2 text-left text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:px-3 lg:text-sm dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white'

export default function Navbar() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAdmin, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const { cartCount, theme, toggleTheme } = useMarketplace()
  const isDark = theme === 'dark'

  const goHomeSection = useCallback(
    (elementId) => {
      setOpen(false)
      if (location.pathname === '/') {
        navigate({ pathname: '/', search: location.search, hash: `#${elementId}` }, { replace: true })
        window.requestAnimationFrame(() => {
          document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      } else {
        navigate({ pathname: '/', hash: `#${elementId}` })
      }
    },
    [location.pathname, location.search, navigate],
  )

  return (
    <header className="sticky top-0 z-50 overflow-x-clip border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-white/[0.06] dark:bg-slate-950/80 dark:backdrop-blur-xl">
      <div className="mx-auto flex min-w-0 max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-6 sm:py-3 lg:gap-4 lg:px-8">
        <div className="relative z-[2] min-w-0 max-w-[46%] shrink-0 sm:max-w-none">
          <BrandLogo
            size="md"
            fitHeader
            onClick={() => setOpen(false)}
            className="rounded-xl outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-blue-400/40 dark:focus-visible:ring-offset-slate-950"
          />
        </div>

        <nav className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 overflow-x-auto pl-1 [scrollbar-width:none] md:flex md:justify-start md:pl-2 lg:justify-center lg:gap-1 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0">
          <button type="button" className={sectionNavClass} onClick={() => goHomeSection('catalog')}>
            {t('nav.productList')}
          </button>
          <NavLink to="/services" className={navLinkClass}>
            {t('nav.services')}
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            {t('nav.contact')}
          </NavLink>
          {user && (
            <NavLink to="/profile" className={navLinkClass}>
              {t('nav.profile')}
            </NavLink>
          )}
        </nav>

        <div className="relative z-[2] hidden shrink-0 flex-nowrap items-center gap-1 sm:flex">
          <LanguageToggle />
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label={isDark ? t('nav.themeLight') : t('nav.themeDark')}
          >
            {isDark ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
          {user ? (
            <>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `inline-flex shrink-0 items-center whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-colors lg:px-3.5 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-violet-950/70 dark:text-blue-400'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`
                }
              >
                {t('nav.cart')}
                {cartCount > 0 && (
                  <span className="ml-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800 dark:bg-blue-900/60 dark:text-blue-200">
                    {cartCount}
                  </span>
                )}
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `inline-flex shrink-0 items-center whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-colors lg:px-3.5 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-violet-950/70 dark:text-blue-400'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`
                  }
                >
                  {t('nav.admin')}
                </NavLink>
              )}
              <span
                className="flex max-w-[min(200px,28vw)] items-center gap-2 truncate whitespace-nowrap px-1 text-sm text-slate-600 lg:max-w-[220px] dark:text-slate-400"
                title={user.email}
              >
                <span className="truncate">{user.name || user.email}</span>
                {isAdmin && (
                  <span className="shrink-0 rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-800 dark:bg-violet-900/60 dark:text-violet-200">
                    {t('nav.roleAdmin')}
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={logout}
                className="whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 lg:px-4 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 lg:px-4 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                className="whitespace-nowrap rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-2 text-sm font-medium text-white shadow-md shadow-blue-500/25 transition hover:from-blue-500 hover:to-violet-500 lg:px-4"
              >
                {t('nav.signup')}
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden"
          aria-expanded={open}
          aria-label={t('nav.menu')}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="mb-3 flex items-center justify-between gap-2">
            <LanguageToggle />
            <span className="text-xs text-slate-500 dark:text-slate-400">{t('nav.menu')}</span>
          </div>
          <nav className="flex flex-col gap-1">
            <button type="button" className={sectionNavClass} onClick={() => goHomeSection('catalog')}>
              {t('nav.productList')}
            </button>
            <NavLink to="/services" className={navLinkClass} onClick={() => setOpen(false)}>
              {t('nav.services')}
            </NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>
              {t('nav.contact')}
            </NavLink>
            {user && (
              <NavLink to="/profile" className={navLinkClass} onClick={() => setOpen(false)}>
                {t('nav.profile')}
              </NavLink>
            )}
            <button
              type="button"
              onClick={() => {
                toggleTheme()
              }}
              className="rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 dark:text-slate-400"
            >
              {isDark ? t('nav.themeLight') : t('nav.themeDark')}
            </button>
            <hr className="my-2 border-slate-100 dark:border-slate-800" />
            {user ? (
              <>
                <NavLink to="/cart" className={navLinkClass} onClick={() => setOpen(false)}>
                  {t('nav.cart')} {cartCount > 0 ? `(${cartCount})` : ''}
                </NavLink>
                {isAdmin && (
                  <NavLink to="/admin" className={navLinkClass} onClick={() => setOpen(false)}>
                    {t('nav.admin')}
                  </NavLink>
                )}
                <p className="px-3 text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                <button
                  type="button"
                  className="rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 dark:text-slate-400"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400"
                  onClick={() => setOpen(false)}
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-400"
                  onClick={() => setOpen(false)}
                >
                  {t('nav.signup')}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
