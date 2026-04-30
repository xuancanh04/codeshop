import { getApiBaseUrl, isCatalogMocked } from '../config/api.js'
import { mockProjects } from '../mocks/catalog/projects.js'

/** @param {number} ms */
function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

/**
 * Maps API JSON to the shape the UI expects. Adjust when your backend schema is fixed.
 * @param {unknown} raw
 * @returns {import('../types/catalog.js').CatalogProject | null}
 */
export function normalizeCatalogProject(raw) {
  if (!raw || typeof raw !== 'object') return null
  const r = /** @type {Record<string, unknown>} */ (raw)
  const id = r.id != null ? String(r.id) : ''
  if (!id) return null
  const tags = Array.isArray(r.tags) ? r.tags.map(String) : []
  const technologies = Array.isArray(r.technologies) ? r.technologies.map(String) : []
  const features = Array.isArray(r.features) ? r.features.map(String) : []
  const listPriceNum = Number(r.listPrice)
  return {
    id,
    title: String(r.title ?? ''),
    slug: r.slug != null ? String(r.slug) : '',
    shortDescription: String(r.shortDescription ?? ''),
    description: String(r.description ?? ''),
    price: Number(r.price) || 0,
    listPrice: r.listPrice != null && r.listPrice !== '' && Number.isFinite(listPriceNum) ? listPriceNum : undefined,
    rating: Number(r.rating) || 0,
    reviewCount: Number(r.reviewCount) || 0,
    image: String(r.image ?? ''),
    tags,
    technologies,
    features,
    category: String(r.category ?? 'web'),
    bestSeller: Boolean(r.bestSeller),
    isNew: Boolean(r.isNew),
  }
}

/**
 * Accepts `[]`, `{ data: [] }`, `{ projects: [] }`, or `{ items: [] }`.
 * @param {unknown} body
 * @returns {import('../types/catalog.js').CatalogProject[] | null}
 */
export function parseCatalogList(body) {
  if (Array.isArray(body)) {
    return /** @type {import('../types/catalog.js').CatalogProject[]} */ (
      body.map(normalizeCatalogProject).filter(Boolean)
    )
  }
  if (!body || typeof body !== 'object') return null
  const b = /** @type {Record<string, unknown>} */ (body)
  const arr = b.data ?? b.projects ?? b.items
  if (!Array.isArray(arr)) return null
  return /** @type {import('../types/catalog.js').CatalogProject[]} */ (
    arr.map(normalizeCatalogProject).filter(Boolean)
  )
}

/**
 * GET list — mock delay unless `VITE_USE_MOCK_CATALOG=false` and `VITE_API_URL` is set.
 * Expected live route: `GET {VITE_API_URL}/projects`
 */
export async function fetchCatalog() {
  const base = getApiBaseUrl()
  if (!isCatalogMocked() && base) {
    const res = await fetch(`${base}/projects`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      throw new Error(`Catalog request failed: ${res.status}`)
    }
    const body = await res.json()
    const list = parseCatalogList(body)
    if (!list) {
      throw new Error('Invalid catalog response: expected array or { data | projects | items }')
    }
    return { data: list }
  }

  await delay(450)
  return { data: mockProjects.map((p) => ({ ...p })) }
}

/**
 * GET one — mock unless live API.
 * Expected live route: `GET {VITE_API_URL}/projects/:id`
 * @param {string} id
 */
export async function fetchProjectById(id) {
  const base = getApiBaseUrl()
  if (!isCatalogMocked() && base) {
    const res = await fetch(`${base}/projects/${encodeURIComponent(id)}`, {
      headers: { Accept: 'application/json' },
    })
    if (res.status === 404) {
      return { data: null }
    }
    if (!res.ok) {
      throw new Error(`Project request failed: ${res.status}`)
    }
    const body = await res.json()
    const raw = body && typeof body === 'object' && 'data' in body ? body.data : body
    const project = normalizeCatalogProject(raw)
    return { data: project }
  }

  await delay(280)
  const project = mockProjects.find((p) => p.id === id) ?? null
  return { data: project ? { ...project } : null }
}
