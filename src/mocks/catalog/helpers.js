import { mockProjects } from './projects.js'

/**
 * @param {unknown} project
 * @returns {boolean}
 */
export function isOnSale(project) {
  if (!project || typeof project !== 'object') return false
  const p = /** @type {{ listPrice?: number; price?: number }} */ (project)
  const lp = p.listPrice
  return typeof lp === 'number' && typeof p.price === 'number' && lp > p.price
}

/**
 * @param {string} id
 */
export function getProjectById(id) {
  return mockProjects.find((p) => p.id === id) ?? null
}
