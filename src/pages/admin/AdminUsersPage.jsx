import { useMemo, useState } from 'react'
import { readUsers, ROLE_ADMIN, ROLE_USER, patchUserByEmail, ADMIN_DEMO_EMAIL } from '../../auth/authUsers'

function isDemoAdminEmail(email) {
  return email.trim().toLowerCase() === ADMIN_DEMO_EMAIL.toLowerCase()
}
import { useI18n } from '../../context/I18nContext'
import { useAuth } from '../../context/AuthContext'
import { useMarketplace } from '../../context/MarketplaceContext'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import Modal from '../../components/Modal'

export default function AdminUsersPage() {
  const { t } = useI18n()
  const { user, refreshUser } = useAuth()
  const { addToast } = useMarketplace()
  const [tick, setTick] = useState(0)
  const [editing, setEditing] = useState(null)

  const rows = useMemo(() => {
    void tick
    const list = readUsers().map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role === ROLE_ADMIN ? ROLE_ADMIN : ROLE_USER,
      createdAt: typeof u.createdAt === 'number' ? u.createdAt : 0,
      joined: u.createdAt
        ? new Date(u.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : '—',
    }))
    list.sort((a, b) => {
      if (a.role !== b.role) return a.role === ROLE_ADMIN ? -1 : 1
      return b.createdAt - a.createdAt
    })
    return list
  }, [tick])

  const handleSaveUser = () => {
    if (!editing) return
    const name = editing.name.trim()
    if (!name) {
      addToast(t('auth.errorFill'), 'error')
      return
    }
    const em = editing.email.trim().toLowerCase()

    if (isDemoAdminEmail(editing.email)) {
      patchUserByEmail(editing.email, { name, role: ROLE_ADMIN })
    } else {
      patchUserByEmail(editing.email, { name })
    }

    addToast(t('admin.userUpdated'), 'success')
    setEditing(null)
    setTick((n) => n + 1)
    if (user?.email.toLowerCase() === em) refreshUser()
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('admin.usersTitle')}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">{t('admin.dataSource')}</p>
        </div>
        <Button type="button" variant="secondary" onClick={() => setTick((n) => n + 1)}>
          {t('admin.refresh')}
        </Button>
      </div>

      <div className="-mx-4 mt-8 overflow-hidden rounded-none border-y border-slate-200 bg-white shadow-sm sm:mx-0 sm:rounded-2xl sm:border dark:border-slate-800 dark:bg-slate-900">
        {rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-600 dark:text-slate-400">{t('admin.usersEmpty')}</p>
        ) : (
          <div className="overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium lg:px-6">{t('admin.colUser')}</th>
                  <th className="px-4 py-3 font-medium">{t('admin.colRole')}</th>
                  <th className="px-4 py-3 font-medium">{t('admin.colJoined')}</th>
                  <th className="px-4 py-3 font-medium text-right lg:px-6">{t('admin.colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {rows.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-4 lg:px-6">
                      <p className="font-medium text-slate-900 dark:text-white">{u.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{u.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <Badge tone={u.role === ROLE_ADMIN ? 'accent' : 'primary'}>
                        {u.role === ROLE_ADMIN ? t('admin.roleAdmin') : t('admin.roleCustomer')}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{u.joined}</td>
                    <td className="px-4 py-4 text-right lg:px-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => setEditing({ email: u.email, name: u.name })}
                      >
                        {t('admin.edit')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={t('admin.editUserTitle')}
        closeLabel={t('common.close')}
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setEditing(null)}>
              {t('common.close')}
            </Button>
            <Button type="button" onClick={handleSaveUser}>
              {t('admin.saveUser')}
            </Button>
          </div>
        }
      >
        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                {t('profile.email')}
              </label>
              <p className="mt-1 text-sm text-slate-800 dark:text-slate-200">{editing.email}</p>
            </div>
            <div>
              <label
                htmlFor="admin-edit-name"
                className="block text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                {t('profile.displayName')}
              </label>
              <input
                id="admin-edit-name"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-blue-500/30 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              />
            </div>
            {isDemoAdminEmail(editing.email) ? (
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('admin.colRole')}</p>
                <div className="mt-2 flex flex-col gap-1">
                  <Badge tone="accent">{t('admin.roleAdmin')}</Badge>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t('admin.demoPanelAccountHint')}</p>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
