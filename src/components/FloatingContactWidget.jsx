import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../context/I18nContext'
import { contactChannels } from '../config/contactChannels'

function pickBotReply(text, t) {
  const q = text.trim().toLowerCase()
  if (!q) return t('chatbot.replyEmpty')
  if (/^(chào|xin chào|hello|hi|hey|chao)\b|chào bạn/.test(q)) return t('chatbot.replyGreeting')
  if (/giá|price|bao nhiêu|cost|mua|mua code|purchase|thanh toán|pay/.test(q)) return t('chatbot.replyPrice')
  if (/liên hệ|contact|zalo|phone|gọi|hotline|sdt|số điện thoại/.test(q)) {
    return t('chatbot.replyContact', { phone: contactChannels.phoneDisplay })
  }
  if (/admin|quản trị|dashboard/.test(q)) return t('chatbot.replyAdmin')
  return t('chatbot.replyDefault')
}

export default function FloatingContactWidget() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(() => [{ role: 'bot', text: t('chatbot.welcome') }])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    if (!open) return
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const send = (e) => {
    e?.preventDefault()
    const text = draft.trim()
    if (!text || busy) return
    setDraft('')
    setMessages((m) => [...m, { role: 'user', text }])
    setBusy(true)
    window.setTimeout(() => {
      const reply = pickBotReply(text, t)
      setMessages((m) => [...m, { role: 'bot', text: reply }])
      setBusy(false)
    }, 500 + Math.random() * 400)
  }

  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-[70] flex flex-col-reverse items-end gap-3 sm:right-6">
      {open && (
        <div
          className="pointer-events-auto mb-1 flex max-h-[min(420px,70vh)] w-[min(calc(100vw-2rem),320px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40"
          role="dialog"
          aria-label={t('chatbot.title')}
        >
          <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 dark:border-slate-700">
            <div>
              <p className="text-sm font-semibold text-white">{t('chatbot.title')}</p>
              <p className="text-xs text-white/80">{t('chatbot.subtitle')}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-white/90 hover:bg-white/10"
              aria-label={t('common.close')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-3 text-sm" style={{ maxHeight: '280px' }}>
            {messages.map((msg, i) => (
              <div
                key={`m-${i}`}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <span
                  className={`max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <span className="rounded-2xl bg-slate-100 px-3 py-2 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {t('chatbot.typing')}
                </span>
              </div>
            )}
          </div>
          <form onSubmit={send} className="border-t border-slate-100 p-2 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t('chatbot.placeholder')}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
              />
              <button
                type="submit"
                disabled={busy}
                className="shrink-0 rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
              >
                {t('chatbot.send')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="pointer-events-auto flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/30 transition hover:scale-105 hover:shadow-xl"
          aria-expanded={open}
          aria-label={t('chatbot.open')}
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
        </button>

        <a
          href={contactChannels.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg shadow-blue-600/30 transition hover:scale-105"
          aria-label={t('contact.zaloAria')}
          title={t('contact.zaloAria')}
        >
          <span className="text-xs font-bold tracking-tight">Zalo</span>
        </a>

        <a
          href={`tel:${contactChannels.phoneTel}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 transition hover:scale-105"
          aria-label={t('contact.phoneAria')}
          title={contactChannels.phoneDisplay}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
