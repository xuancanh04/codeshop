/**
 * @typedef {Object} CatalogCategory
 * @property {string} id
 * @property {string} label
 */

/**
 * @typedef {Object} CatalogProject
 * @property {string} id
 * @property {string} title
 * @property {string} [slug]
 * @property {string} shortDescription
 * @property {string} description
 * @property {number} price
 * @property {number} [listPrice] — optional “was” price for sale UI
 * @property {number} rating
 * @property {number} reviewCount
 * @property {string} image
 * @property {string[]} tags
 * @property {string[]} technologies
 * @property {string[]} features
 * @property {string} category — must match a CatalogCategory.id used in filters
 * @property {boolean} [bestSeller]
 * @property {boolean} [isNew]
 */

/**
 * @typedef {{ data: CatalogProject[] }} CatalogListResponse
 */

export {}
