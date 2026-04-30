import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  readUsers,
  writeUsers,
  ensureAuthUsersSeeded,
  patchUserByEmail,
  ROLE_USER,
  ROLE_ADMIN,
  ADMIN_DEMO_EMAIL,
  LEGACY_ADMIN_DEMO_EMAIL,
  canAccessAdminPanel,
} from '../auth/authUsers'
import { useMarketplace } from './MarketplaceContext'
import { useI18n } from './I18nContext'

const AuthContext = createContext(null)

let authUsersSeededOnce = false
function runAuthUsersSeed() {
  if (typeof window === 'undefined' || authUsersSeededOnce) return
  authUsersSeededOnce = true
  ensureAuthUsersSeeded()
}

export function AuthProvider({ children }) {
  const [session, setSession] = useLocalStorage('cm-session', null)
  const [profileRevision, setProfileRevision] = useState(0)
  const { addToast } = useMarketplace()
  const { t } = useI18n()

  runAuthUsersSeed()

  useEffect(() => {
    const e = session?.email?.trim().toLowerCase()
    if (!e || e !== LEGACY_ADMIN_DEMO_EMAIL.toLowerCase()) return
    setSession({ email: ADMIN_DEMO_EMAIL })
  }, [session, setSession])

  const user = useMemo(() => {
    void profileRevision
    if (!session?.email) return null
    const u = readUsers().find(
      (x) => x.email.toLowerCase() === String(session.email).toLowerCase(),
    )
    if (!u) return null
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      createdAt: u.createdAt,
      role: u.role === ROLE_ADMIN ? ROLE_ADMIN : ROLE_USER,
    }
  }, [session, profileRevision])

  const isAdmin = canAccessAdminPanel(user)

  const login = useCallback(
    (email, password) => {
      const trimmed = email.trim()
      const pwd = password
      if (!trimmed || !pwd) {
        addToast(t('auth.errorFill'), 'error')
        return null
      }
      const u = readUsers().find((x) => x.email.toLowerCase() === trimmed.toLowerCase())
      if (!u || u.password !== pwd) {
        addToast(t('auth.errorCreds'), 'error')
        return null
      }
      setSession({ email: u.email })
      addToast(t('auth.loginBtn') + ' ✓', 'success')
      const role = u.role === ROLE_ADMIN ? ROLE_ADMIN : ROLE_USER
      return { email: u.email, name: u.name, role }
    },
    [addToast, setSession, t],
  )

  const register = useCallback(
    (name, email, password) => {
      const n = name.trim()
      const em = email.trim()
      if (!n || !em || !password) {
        addToast(t('auth.errorFill'), 'error')
        return null
      }
      if (password.length < 6) {
        addToast(t('auth.errorPassword'), 'error')
        return null
      }
      if (em.toLowerCase() === ADMIN_DEMO_EMAIL.toLowerCase()) {
        addToast(t('auth.adminEmailReserved'), 'error')
        return null
      }
      const users = readUsers()
      if (users.some((x) => x.email.toLowerCase() === em.toLowerCase())) {
        addToast(t('auth.errorEmail'), 'error')
        return null
      }
      const row = {
        id: crypto.randomUUID(),
        name: n,
        email: em,
        password,
        role: ROLE_USER,
        createdAt: Date.now(),
      }
      writeUsers([...users, row])
      setSession({ email: em })
      addToast(t('auth.registerBtn') + ' ✓', 'success')
      return { email: em, name: n, role: ROLE_USER }
    },
    [addToast, setSession, t],
  )

  const logout = useCallback(() => {
    setSession(null)
    addToast(t('nav.logout'), 'info')
  }, [addToast, setSession, t])

  const refreshUser = useCallback(() => {
    setProfileRevision((n) => n + 1)
  }, [])

  const updateProfile = useCallback(
    ({ name, currentPassword, newPassword }) => {
      if (!user) return false
      const row = readUsers().find(
        (x) => x.email.toLowerCase() === user.email.toLowerCase(),
      )
      if (!row) return false

      const nextName = name != null ? String(name).trim() : row.name
      if (!nextName) {
        addToast(t('auth.errorFill'), 'error')
        return false
      }

      if (newPassword) {
        if (!currentPassword || row.password !== currentPassword) {
          addToast(t('auth.wrongPassword'), 'error')
          return false
        }
        if (newPassword.length < 6) {
          addToast(t('auth.errorPassword'), 'error')
          return false
        }
        patchUserByEmail(user.email, { name: nextName, password: newPassword })
      } else {
        patchUserByEmail(user.email, { name: nextName })
      }

      setProfileRevision((n) => n + 1)
      addToast(t('profile.saved'), 'success')
      return true
    },
    [user, addToast, t],
  )

  const value = useMemo(
    () => ({
      user,
      isAdmin,
      login,
      register,
      logout,
      updateProfile,
      refreshUser,
      isAuthenticated: Boolean(user),
    }),
    [user, isAdmin, login, register, logout, updateProfile, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- useAuth
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
