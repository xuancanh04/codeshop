/**
 * API base URL, no trailing slash.
 * Example: `http://localhost:4000/api` or `https://api.example.com/v1`
 */
export function getApiBaseUrl() {
  const u = import.meta.env.VITE_API_URL
  return typeof u === 'string' ? u.replace(/\/$/, '') : ''
}

/**
 * When `true`, catalog uses local mocks. Set `VITE_USE_MOCK_CATALOG=false` and
 * `VITE_API_URL` to call your backend.
 */
export function isCatalogMocked() {
  const v = import.meta.env.VITE_USE_MOCK_CATALOG
  if (v === 'false' || v === '0') return false
  return true
}
