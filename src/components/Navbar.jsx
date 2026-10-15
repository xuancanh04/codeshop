import { useCallback, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useMarketplace } from '../context/MarketplaceContext'
import LanguageToggle from './LanguageToggle'
import BrandLogo from './BrandLogo'

const navLinkClass = ({ isActive }) =>
  `relative inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 lg:text-sm ${
    isActive
      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
  }`

const sectionNavClass =
  'relative inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-slate-600 transition-all duration-300 hover:text-slate-900 hover:bg-slate-100/70 lg:text-sm dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'

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
      const scrollToEl = () => {
        const el = document.getElementById(elementId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }

      if (location.pathname === '/') {
        scrollToEl()
        // Fallback with small timeout in case DOM or images shifting
        setTimeout(scrollToEl, 100)
      } else {
        navigate(`/#${elementId}`)
      }
    },
    [location.pathname, navigate],
  )

  return (
    <header className="sticky top-0 z-50 px-3 py-2.5 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-2 pl-4 pr-3 shadow-lg shadow-slate-200/40 backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-950/85 dark:shadow-black/40">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <BrandLogo
            size="md"
            fitHeader
            onClick={() => setOpen(false)}
            className="outline-none transition-transform duration-200 hover:scale-105"
          />
        </div>

        {/* Center Navigation Links - Floating Pill Island */}
        <nav className="hidden items-center gap-1 rounded-full border border-slate-200/60 bg-slate-50/60 p-1 backdrop-blur-md md:flex dark:border-white/[0.06] dark:bg-slate-900/50">
          <NavLink to="/" end className={navLinkClass}>
            {t('nav.home')}
          </NavLink>
          <button type="button" className={sectionNavClass} onClick={() => goHomeSection('catalog')}>
            {t('nav.courses')}
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

        {/* Right Actions */}
        <div className="hidden items-center gap-2 sm:flex">
          <LanguageToggle />

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/80 text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label={isDark ? t('nav.themeLight') : t('nav.themeDark')}
          >
            {isDark ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* Cart Button */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold transition ${
                isActive
                  ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                  : 'border-slate-200/80 bg-slate-50/80 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800'
              }`
            }
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span>{t('nav.cart')}</span>
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[11px] font-bold text-white shadow-xs">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* User state */}
          {user ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className="rounded-xl border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-xs font-bold text-violet-700 hover:bg-violet-100 dark:border-violet-800/60 dark:bg-violet-950/40 dark:text-violet-300"
                >
                  Admin
                </NavLink>
              )}
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-[11px] font-bold text-white">
                  {(user.name || user.email || 'U')[0].toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{user.name || user.email}</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                title={t('nav.logout')}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/25 transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/35"
            >
              <span>{t('nav.login')}</span>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/80 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 md:hidden"
          aria-expanded={open}
          aria-label={t('nav.menu')}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <NavLink to="/" end className={navLinkClass} onClick={() => setOpen(false)}>
              {t('nav.home')}
            </NavLink>
            <button type="button" className={sectionNavClass} onClick={() => goHomeSection('catalog')}>
              {t('nav.courses')}
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
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-400"
                onClick={() => setOpen(false)}
              >
                {t('nav.login')}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
