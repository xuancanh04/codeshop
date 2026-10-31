import { Link } from 'react-router-dom'
import { SITE_LOGO_ALT, SITE_LOGO_SRC, SITE_BRAND_NAME } from '../config/branding'

export default function BrandLogo({ className = '', fitHeader = false, onClick }) {
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
        <span className="text-xl font-black tracking-tight leading-none text-white">
          Code<span className="text-cyan-400">Hub</span>
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Digital Solutions & Web Platform
        </span>
      </div>
    </Link>
  )
}
