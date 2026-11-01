import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE_BRAND_NAME } from '../config/branding'

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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Khung chat */}
      {open && (
        <div className="w-[min(calc(100vw-2rem),360px)] rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-xs">
                C
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Trợ Lý Số {SITE_BRAND_NAME}</h4>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Trực tuyến
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Messages list */}
          <div className="my-3 max-h-60 space-y-2.5 overflow-y-auto text-xs pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-800 bg-slate-900 text-slate-200'
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
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-500"
            >
              Gửi
            </button>
          </form>

          <div className="mt-2 text-center">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="text-[11px] font-semibold text-cyan-400 hover:underline"
            >
              ⚡ Gửi yêu cầu tư vấn dự án
            </Link>
          </div>
        </div>
      )}

      {/* Button kích hoạt chat */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 transition hover:scale-110"
          title="Hỗ trợ trực tuyến"
        >
          <span className="text-lg">💬</span>
        </button>
      </div>
    </div>
  )
}
