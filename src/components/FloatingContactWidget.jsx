import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE_BRAND_NAME } from '../config/branding'
import { contactChannels } from '../config/contactChannels'

export default function FloatingContactWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Xin chào! Tôi là trợ lý tư vấn số ${SITE_BRAND_NAME}. Bạn đang quan tâm đến thiết kế website doanh nghiệp, bán hàng hay web app theo yêu cầu?`,
    },
  ])
  const [draft, setDraft] = useState('')

  const handleSend = (e) => {
    e?.preventDefault()
    if (!draft.trim()) return
    const userMsg = draft.trim()
    setDraft('')
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }])

    setTimeout(() => {
      let reply = `Cảm ơn bạn đã quan tâm! Đội ngũ ${SITE_BRAND_NAME} có thể thiết kế và bàn giao 100% quyền sở hữu theo nhu cầu của bạn. Bạn có thể gửi thông tin qua form liên hệ để nhận tư vấn chi tiết nhé!`
      if (/giá|chi phí|báo giá|bao nhiêu/.test(userMsg.toLowerCase())) {
        reply = `Về chi phí, ${SITE_BRAND_NAME} cung cấp Gói Setup (đầu tư 1 lần) và các Gói Vận hành linh hoạt hàng tháng (Basic, Growth, Performance). Bạn có thể bấm vào trang Liên hệ để nhận đề xuất báo giá phù hợp nhất!`
      }
      setMessages((prev) => [...prev, { role: 'bot', text: reply }])
    }, 600)
  }

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {/* Khung chat bot */}
      {open && (
        <div className="mb-2 w-[min(calc(100vw-2.5rem),360px)] rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 transition-all animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 font-bold text-white text-xs shadow-md">
                C
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Trợ Lý Số {SITE_BRAND_NAME}</h4>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-500 dark:text-emerald-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Trực tuyến
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-white transition"
              aria-label="Đóng chat"
            >
              ✕
            </button>
          </div>

          {/* Messages list */}
          <div className="my-3 max-h-64 space-y-2.5 overflow-y-auto text-xs pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-br-sm'
                      : 'border border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition shadow-sm"
            >
              Gửi
            </button>
          </form>

          <div className="mt-2.5 text-center">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="text-[11px] font-semibold text-blue-600 hover:underline dark:text-cyan-400"
            >
              ⚡ Gửi yêu cầu tư vấn dự án
            </Link>
          </div>
        </div>
      )}

      {/* Cụm bong bóng liên hệ xếp theo HÀNG DỌC (Vertical Column) */}
      <div className="flex flex-col items-center gap-3">
        {/* Nút 1: Zalo (Dạng nút tròn nổi dọc) */}
        <a
          href={contactChannels.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
          title="Tư vấn qua Zalo"
          aria-label="Tư vấn qua Zalo"
        >
          <span className="font-extrabold text-xs tracking-tight">Zalo</span>
          {/* Tooltip phụ khi hover trên desktop */}
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-800">
            Chat qua Zalo
          </span>
        </a>

        {/* Nút 2: Form Liên Hệ (Dạng nút tròn nổi dọc) */}
        <Link
          to="/contact"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
          title="Gửi yêu cầu tư vấn"
          aria-label="Gửi yêu cầu tư vấn"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-800">
            Gửi yêu cầu tư vấn
          </span>
        </Link>

        {/* Nút 3: Chatbot (Dạng nút tròn nổi dọc với hiệu ứng đập pulse) */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-blue-500/35 transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
          title="Trợ lý trực tuyến"
          aria-label="Trợ lý trực tuyến"
        >
          {open ? (
            <svg className="h-6 w-6 transition-transform duration-200 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <span className="relative flex items-center justify-center">
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
              </span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </span>
          )}
          <span className="pointer-events-none absolute right-15 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-800">
            {open ? 'Đóng chat' : 'Chat tư vấn ngay'}
          </span>
        </button>
      </div>
    </div>
  )
}
