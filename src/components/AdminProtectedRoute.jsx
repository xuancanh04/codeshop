import { useEffect, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useMarketplace } from '../context/MarketplaceContext'
import { ADMIN_DEMO_EMAIL, canAccessAdminPanel } from '../auth/authUsers'

function AdminDeniedToast() {
  const { addToast } = useMarketplace()
  const { t } = useI18n()
  const sent = useRef(false)

  useEffect(() => {
    if (sent.current) return
    sent.current = true
    addToast(t('auth.adminOnly', { email: ADMIN_DEMO_EMAIL }), 'error')
  }, [addToast, t])

  return <Navigate to="/" replace />
}

export default function AdminProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!canAccessAdminPanel(user)) {
    return <AdminDeniedToast />
  }

  return children
}
