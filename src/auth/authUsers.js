/** Demo admin — đăng nhập riêng, không đăng ký qua form user. */
export const ADMIN_DEMO_EMAIL = 'admin@codehub.demo'

/** Email admin demo cũ — dùng migrate dữ liệu localStorage / session. */
export const LEGACY_ADMIN_DEMO_EMAIL = 'admin@codemarket.demo'
export const ADMIN_DEMO_PASSWORD = 'admin123'

const USERS_KEY = 'cm-users'

export const ROLE_USER = 'user'
export const ROLE_ADMIN = 'admin'

/** Chỉ tài khoản admin demo đăng nhập mới mở được /admin (không dùng role admin trên user khác). */
export function canAccessAdminPanel(user) {
  if (!user?.email) return false
  if (user.role !== ROLE_ADMIN) return false
  return user.email.trim().toLowerCase() === ADMIN_DEMO_EMAIL.toLowerCase()
}

export function readUsers() {
  try {
    const raw = window.localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeUsers(users) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

/** @param {string} email */
export function patchUserByEmail(email, patch) {
  const e = email.trim().toLowerCase()
  const users = readUsers()
  const i = users.findIndex((u) => u.email?.toLowerCase() === e)
  if (i < 0) return false
  users[i] = { ...users[i], ...patch }
  writeUsers(users)
  return true
}

/**
 * Gán role cho user cũ (không có role), đảm bảo có ít nhất một admin demo.
 */
export function ensureAuthUsersSeeded() {
  let users = readUsers().map((u) => {
    const email = u.email?.toLowerCase() === LEGACY_ADMIN_DEMO_EMAIL.toLowerCase() ? ADMIN_DEMO_EMAIL : u.email
    return {
      ...u,
      email,
      role: u.role === ROLE_ADMIN || u.role === ROLE_USER ? u.role : ROLE_USER,
    }
  })

  if (users.some((u) => u.role === ROLE_ADMIN)) {
    writeUsers(users)
    return
  }

  const idx = users.findIndex(
    (u) => u.email?.toLowerCase() === ADMIN_DEMO_EMAIL.toLowerCase(),
  )
  if (idx >= 0) {
    users[idx] = {
      ...users[idx],
      role: ROLE_ADMIN,
      name: users[idx].name || 'Administrator',
      password: users[idx].password || ADMIN_DEMO_PASSWORD,
    }
  } else {
    users.unshift({
      id: 'cm-seed-admin',
      name: 'Administrator',
      email: ADMIN_DEMO_EMAIL,
      password: ADMIN_DEMO_PASSWORD,
      role: ROLE_ADMIN,
      createdAt: Date.now(),
    })
  }

  writeUsers(users)
}
