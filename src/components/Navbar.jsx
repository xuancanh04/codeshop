import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import { useMarketplace } from '../context/MarketplaceContext'
import BrandLogo from './BrandLogo'

export default function Navbar() {
  const { t } = useI18n()
  const { theme, toggleTheme } = useMarketplace()
  const isDark = theme === 'dark'
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Xác định tab đang active: nếu ở trang /contact thì ưu tiên contact
  const currentTab = location.pathname === '/contact' ? 'contact' : activeSection

  // Lắng nghe scroll để tự động đổi màu xanh theo vị trí cuộn trang
  useEffect(() => {
    if (location.pathname !== '/') return

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200

      const tierEl = document.getElementById('tier-services')
      const projectsEl = document.getElementById('projects')
      const pricingEl = document.getElementById('pricing')

      if (pricingEl && scrollPos >= pricingEl.offsetTop) {
        setActiveSection('pricing')
      } else if (projectsEl && scrollPos >= projectsEl.offsetTop) {
        setActiveSection('projects')
      } else if (tierEl && scrollPos >= tierEl.offsetTop) {
        setActiveSection('tier-services')
      } else {
        setActiveSection('home')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const scrollToSection = (id) => {
    setOpen(false)
    setActiveSection(id)
    if (location.pathname !== '/') {
      navigate(`/#${id}`)
      return
    }
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getItemClass = (id) => {
    const isCurrentActive = currentTab === id
    return `px-3.5 py-1.5 text-sm font-medium transition-all duration-200 rounded-lg ${
      isCurrentActive
        ? 'text-blue-600 bg-blue-50 shadow-sm dark:text-cyan-400 dark:bg-white/10 font-bold'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5'
    }`
  }

  return (
    <header className="sticky top-0 z-50 px-3 py-3 sm:px-6 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/70 transition-all duration-300 shadow-sm dark:shadow-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Brand */}
        <BrandLogo onClick={() => setOpen(false)} />

        {/* Center Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-100/70 p-1.5 backdrop-blur-md md:flex shadow-inner dark:border-slate-800 dark:bg-slate-900/60">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className={getItemClass('home')}
          >
            {t('nav.home')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('tier-services')}
            className={getItemClass('tier-services')}
          >
            {t('nav.services')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className={getItemClass('projects')}
          >
            {t('nav.projects')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('pricing')}
            className={getItemClass('pricing')}
          >
            {t('nav.pricing')}
          </button>
          <Link
            to="/contact"
            className={getItemClass('contact')}
          >
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Right CTA / Theme Toggle */}
        <div className="hidden items-center gap-3 sm:flex">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            title={isDark ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
            aria-label="Toggle Theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition duration-200 hover:opacity-95 hover:shadow-cyan-500/20 active:scale-95"
          >
            Tư vấn giải pháp
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            aria-label="Toggle Theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <Link
            to="/contact"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs text-white font-bold"
          >
            Tư vấn
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
            aria-label="Toggle Menu"
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
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="mt-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-xl md:hidden space-y-2 dark:border-slate-800 dark:bg-slate-950/95">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className={`block w-full text-left rounded-lg px-3 py-2 text-sm font-medium ${
              currentTab === 'home'
                ? 'text-blue-600 bg-blue-50 font-bold dark:text-cyan-400 dark:bg-white/10'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            {t('nav.home')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('tier-services')}
            className={`block w-full text-left rounded-lg px-3 py-2 text-sm font-medium ${
              currentTab === 'tier-services'
                ? 'text-blue-600 bg-blue-50 font-bold dark:text-cyan-400 dark:bg-white/10'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            {t('nav.services')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className={`block w-full text-left rounded-lg px-3 py-2 text-sm font-medium ${
              currentTab === 'projects'
                ? 'text-blue-600 bg-blue-50 font-bold dark:text-cyan-400 dark:bg-white/10'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            {t('nav.projects')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('pricing')}
            className={`block w-full text-left rounded-lg px-3 py-2 text-sm font-medium ${
              currentTab === 'pricing'
                ? 'text-blue-600 bg-blue-50 font-bold dark:text-cyan-400 dark:bg-white/10'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            {t('nav.pricing')}
          </button>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className={`block rounded-lg px-3 py-2 text-sm font-medium ${
              currentTab === 'contact'
                ? 'text-blue-600 bg-blue-50 font-bold dark:text-cyan-400 dark:bg-white/10'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            {t('nav.contact')}
          </Link>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-bold text-white shadow-md"
            >
              Liên hệ nhận tư vấn ngay
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
