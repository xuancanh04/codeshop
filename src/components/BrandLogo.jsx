import { Link } from 'react-router-dom'
import { SITE_LOGO_ALT, SITE_LOGO_SRC } from '../config/branding'

export default function BrandLogo({ className = '', onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`inline-flex items-center gap-3 transition-transform duration-200 hover:scale-105 ${className}`}
    >
      <img
        src={SITE_LOGO_SRC}
        alt={SITE_LOGO_ALT}
        className="h-10 w-auto object-contain"
        onError={(e) => {
          e.target.style.display = 'none'
        }}
      />
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tight leading-none text-slate-900 dark:text-white">
          Code<span className="text-blue-600 dark:text-cyan-400">Hub</span>
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Digital Solutions & Web Platform
        </span>
      </div>
    </Link>
  )
}
