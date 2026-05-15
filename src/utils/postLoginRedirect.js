import { canAccessAdminPanel } from '../auth/authUsers'

/**
 * @param {string | undefined} fromPath
 * @param {{ email: string, role: string }} loggedUser
 */
export function resolveAfterAuthPath(fromPath, loggedUser) {
  const fallback = '/profile'
  const isPanel = canAccessAdminPanel(loggedUser)
  if (isPanel) return '/admin'
  const p = typeof fromPath === 'string' && fromPath ? fromPath : fallback
  if (p.startsWith('/admin') && !isPanel) return '/'
  if ((p === '/dashboard' || p.startsWith('/dashboard')) && !isPanel) return fallback
  return p
}
