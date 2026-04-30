const KEY = 'cm-orders'

export function readAllOrders() {
  return readAll()
}

function readAll() {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * @param {{ email: string, items: Array<{ id: string, title: string, price: number }>, total: number }} order
 */
export function appendOrder(order) {
  const list = readAll()
  list.unshift({
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    ...order,
  })
  window.localStorage.setItem(KEY, JSON.stringify(list))
}

/** @param {string} email */
export function getOrdersForEmail(email) {
  const e = email.trim().toLowerCase()
  return readAll().filter((o) => o.email?.toLowerCase() === e)
}
