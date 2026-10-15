import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ADMIN_DEMO_EMAIL, ADMIN_DEMO_PASSWORD } from '../auth/authUsers'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { resolveAfterAuthPath } from '../utils/postLoginRedirect'

const inputClass =
  'mt-2 w-full rounded-xl border border-sky-100 bg-sky-50/90 px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:border-sky-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-500/60 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-400 dark:focus:ring-sky-500/25'

function LoginIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
      />
    </svg>
  )
}

export default function LoginPage() {
  const { t } = useI18n()
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/profile'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const logged = login(email, password)
    if (logged) {
      navigate(resolveAfterAuthPath(from, logged), { replace: true })
    }
  }

  if (user) {
    return <Navigate to={resolveAfterAuthPath(from, user)} replace />
  }

  return (
    <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div
        className="pointer-events-none absolute inset-x-6 top-1/2 -z-10 h-64 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-sky-400/10 blur-3xl dark:from-blue-500/30 dark:via-violet-500/20 dark:to-sky-400/15"
        aria-hidden
      />

      <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 sm:p-9 dark:border-slate-600/70 dark:bg-slate-800 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_48px_-12px_rgba(0,0,0,0.65),0_0_40px_-8px_rgba(0,132,255,0.22)]">
        <h1 className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t('auth.formTitle')}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-300">{t('auth.formWelcome')}</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('auth.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('auth.password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
              />
              {t('auth.rememberLogin')}
            </label>
            <button
              type="button"
              className="font-medium text-violet-600 hover:text-violet-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300"
            >
              {t('auth.forgot')}
            </button>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-400 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-sky-400/30 transition hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:bg-blue-500 dark:shadow-[0_8px_24px_-6px_rgba(0,132,255,0.55)] dark:hover:bg-blue-400"
          >
            <LoginIcon />
            {t('auth.loginBtn')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          {t('auth.noAccount')}{' '}
          <Link
            to="/register"
            className="font-medium text-violet-600 hover:text-violet-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300"
          >
            {t('auth.createOne')}
          </Link>
        </p>

        <p className="mt-4 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-center text-xs leading-relaxed text-slate-500 dark:border-slate-600/50 dark:bg-slate-900/80 dark:text-slate-300">
          {t('auth.demoAdminHint', { email: ADMIN_DEMO_EMAIL, password: ADMIN_DEMO_PASSWORD })}
        </p>
      </div>
    </div>
  )
}
