import { useI18n } from '../context/I18nContext'

function VietnamFlag({ className = 'h-3.5 w-5' }) {
  return (
    <svg className={`shrink-0 rounded-xs shadow-xs ${className}`} viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#da251d" />
      <polygon
        points="15,4 16.5,8.8 21.6,8.8 17.5,11.8 19.1,16.6 15,13.6 10.9,16.6 12.5,11.8 8.4,8.8 13.5,8.8"
        fill="#ffff00"
      />
    </svg>
  )
}

function UkFlag({ className = 'h-3.5 w-5' }) {
  return (
    <svg className={`shrink-0 rounded-xs shadow-xs ${className}`} viewBox="0 0 60 30" aria-hidden="true">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

export default function LanguageToggle({ className = '' }) {
  const { locale, setLanguage } = useI18n()
  const isVi = locale === 'vi'

  const handleToggle = () => {
    setLanguage(isVi ? 'en' : 'vi')
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`group relative flex h-9 items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50/80 px-2.5 text-xs font-semibold text-slate-700 shadow-2xs backdrop-blur-sm transition duration-200 hover:scale-105 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 ${className}`}
      title={isVi ? 'Chuyển sang English' : 'Switch to Tiếng Việt'}
      aria-label={isVi ? 'Chuyển sang English' : 'Switch to Tiếng Việt'}
    >
      {isVi ? <VietnamFlag /> : <UkFlag />}
      <span className="font-bold tracking-wide uppercase">{isVi ? 'VI' : 'EN'}</span>
    </button>
  )
}



