import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ADMIN_DEMO_EMAIL, ADMIN_DEMO_PASSWORD } from '../auth/authUsers'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { resolveAfterAuthPath } from '../utils/postLoginRedirect'
import Button from '../components/Button'

export default function LoginPage() {
  const { t } = useI18n()
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/profile'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{t('auth.loginTitle')}</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t('auth.loginSub')}</p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
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
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="you@university.edu"
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
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
              {t('auth.remember')}
            </label>
            <span className="font-medium text-blue-600 dark:text-blue-400">{t('auth.forgot')}</span>
          </div>
          <Button type="submit" className="w-full" size="lg">
            {t('auth.loginBtn')}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            {t('auth.createOne')}
          </Link>
        </p>
        <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-center text-xs leading-relaxed text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
          {t('auth.demoAdminHint', { email: ADMIN_DEMO_EMAIL, password: ADMIN_DEMO_PASSWORD })}
        </p>
      </div>
    </div>
  )
}
