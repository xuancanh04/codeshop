/**
 * Legacy barrel — UI imports `categories`, `projects`, `reviews` from here.
 * Source of truth for catalog mocks: `src/mocks/catalog/*`
 */
export { mockCategories as categories } from '../mocks/catalog/categories.js'
export { mockProjects as projects } from '../mocks/catalog/projects.js'
export { mockProductReviews as reviews } from '../mocks/catalog/productReviews.js'
export { isOnSale, getProjectById } from '../mocks/catalog/helpers.js'

export const mockUsers = [
  { id: 'u1', name: 'An Nguyen', email: 'an@student.edu', role: 'Student', joined: '2025-11-12' },
  { id: 'u2', name: 'Chris Lee', email: 'chris@dev.io', role: 'Developer', joined: '2026-01-04' },
  { id: 'u3', name: 'Mai Pham', email: 'mai@uni.vn', role: 'Student', joined: '2026-02-22' },
]

export const mockOrders = [
  { id: 'ORD-1042', user: 'An Nguyen', product: 'Full-Stack E-Commerce', total: 49, status: 'Paid', date: '2026-04-01' },
  { id: 'ORD-1041', user: 'Chris Lee', product: 'AI Resume Screener', total: 59, status: 'Pending', date: '2026-03-30' },
  { id: 'ORD-1040', user: 'Mai Pham', product: 'Portfolio + Blog', total: 24, status: 'Paid', date: '2026-03-28' },
]
