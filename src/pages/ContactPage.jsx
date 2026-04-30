import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import { useMarketplace } from '../context/MarketplaceContext'
import Button from '../components/Button'
import { bankTransferDemo } from '../config/bankTransferDemo'
import { contactChannels } from '../config/contactChannels'

export default function ContactPage() {
  const { t } = useI18n()
  const { addToast } = useMarketplace()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      addToast(t('auth.errorFill'), 'error')
      return
    }
    addToast(t('contact.sent'), 'success')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('contact.title')}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{t('contact.subtitle')}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/60 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('contact.direct')}
          </h2>
          <ul className="mt-4 space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <li>
              <span className="block text-xs text-slate-500 dark:text-slate-400">{t('contact.phoneLabel')}</span>
              <a
                href={`tel:${contactChannels.phoneTel}`}
                className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
              >
                {contactChannels.phoneDisplay}
              </a>
            </li>
            <li>
              <span className="block text-xs text-slate-500 dark:text-slate-400">{t('contact.zaloLabel')}</span>
              <a
                href={contactChannels.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#0068FF] hover:underline"
              >
                {t('contact.zaloOpen')}
              </a>
            </li>
            <li>
              <span className="block text-xs text-slate-500 dark:text-slate-400">{t('contact.emailLabel')}</span>
              <a href={`mailto:${bankTransferDemo.supportNote}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                {bankTransferDemo.supportNote}
              </a>
            </li>
            <li>
              <span className="block text-xs text-slate-500 dark:text-slate-400">{t('contact.addressLabel')}</span>
              <span>{t('footer.location')}</span>
            </li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{t('contact.note')}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-3"
        >
          <div>
            <label htmlFor="ct-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('auth.fullName')}
            </label>
            <input
              id="ct-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="ct-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('auth.email')}
            </label>
            <input
              id="ct-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="ct-msg" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('contact.message')}
            </label>
            <textarea
              id="ct-msg"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit">{t('contact.send')}</Button>
            <Button as={Link} to="/" variant="secondary">
              {t('productDetail.back')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
