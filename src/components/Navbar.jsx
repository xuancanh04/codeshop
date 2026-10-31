import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useMarketplace } from '../context/MarketplaceContext'
import { contactChannels } from '../config/contactChannels'
import BrandLogo from './BrandLogo'

export default function Navbar() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { user, isAdmin, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useMarketplace()
  const isDark = theme === 'dark'

  const scrollToSection = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
    }
  }

  const navClass = ({ isActive }) =>
    `px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-lg ${
      isActive
        ? 'text-cyan-400 bg-white/5 font-semibold'
        : 'text-slate-300 hover:text-white hover:bg-white/5'
    }`

  return (
    <header className="sticky top-0 z-50 px-3 py-3 sm:px-6 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/70 transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Brand */}
        <BrandLogo onClick={() => setOpen(false)} />

        {/* Center Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-slate-800 bg-slate-900/60 p-1.5 backdrop-blur-md md:flex shadow-inner">
          <NavLink to="/" end className={navClass}>
            {t('nav.home')}
          </NavLink>
          <button
            type="button"
            onClick={() => scrollToSection('tier-services')}
            className="px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-white hover:bg-white/5 rounded-lg"
          >
            {t('nav.services')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-white hover:bg-white/5 rounded-lg"
          >
            {t('nav.projects')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('pricing')}
            className="px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-white hover:bg-white/5 rounded-lg"
          >
            {t('nav.pricing')}
          </button>
          <NavLink to="/contact" className={navClass}>
            {t('nav.contact')}
          </NavLink>
        </nav>

        {/* Right CTA / Contact Action */}
        <div className="hidden items-center gap-3 sm:flex">
          {/* Hotline pill */}
          <a
            href={`tel:${contactChannels.phoneTel}`}
            className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-400">{contactChannels.phoneDisplay}</span>
          </a>

          {/* Consultation CTA button */}
          <a
            href={contactChannels.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition duration-200 hover:opacity-95 hover:shadow-cyan-500/20 active:scale-95"
          >
            Tư vấn Zalo ngay
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${contactChannels.phoneTel}`}
            className="rounded-lg bg-slate-900 border border-slate-800 p-2 text-xs text-emerald-400 font-bold"
          >
            📞 Gọi
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:text-white"
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
        <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden space-y-2">
          <NavLink
            to="/"
            end
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            {t('nav.home')}
          </NavLink>
          <button
            type="button"
            onClick={() => scrollToSection('tier-services')}
            className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            {t('nav.services')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            {t('nav.projects')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('pricing')}
            className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            {t('nav.pricing')}
          </button>
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            {t('nav.contact')}
          </NavLink>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={contactChannels.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-bold text-white shadow-md"
            >
              Tư vấn trực tiếp qua Zalo (088 888 9805)
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
