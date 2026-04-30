/**
 * Central mock exports — swap `catalogApi` to HTTP when backend is ready.
 * @see ../config/api.js
 * @see ../api/catalogApi.js
 */
export { mockCategories } from './catalog/categories.js'
export { mockProjects } from './catalog/projects.js'
export { mockProductReviews } from './catalog/productReviews.js'
export { isOnSale, getProjectById } from './catalog/helpers.js'
