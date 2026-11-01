import { useState } from 'react'
import { contactChannels } from '../config/contactChannels'
import { SITE_BRAND_NAME } from '../config/branding'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [need, setNeed] = useState('Website Doanh Nghiệp')
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="bg-slate-950 text-slate-100 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            LIÊN HỆ VỚI {SITE_BRAND_NAME.toUpperCase()}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl text-white">
            Nhận Tư Vấn Phương Án Website Miễn Phí
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-400">
            Trao đổi trực tiếp về mục tiêu kinh doanh, cấu trúc dự án và nhận bản demo phương án thiết kế phù hợp nhất cho doanh nghiệp của bạn.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* Cột thông tin liên hệ */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white">Kênh Kết Nối Nhanh</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Đội ngũ kỹ thuật & tư vấn của {SITE_BRAND_NAME} luôn sẵn sàng hỗ trợ bạn xây dựng giải pháp số tối ưu.
            </p>

            <div className="mt-8 space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
                  ✉️
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-400">Email Hỗ Trợ</span>
                  <p className="mt-1 text-xs text-slate-200">
                    <a href={`mailto:${contactChannels.supportEmail}`} className="hover:underline">
                      {contactChannels.supportEmail}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-600/20 text-cyan-400">
                  📍
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-400">Địa Điểm</span>
                  <p className="mt-1 text-xs text-slate-200">{contactChannels.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cột Form đăng ký nhận tư vấn */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/30 p-8 backdrop-blur-xl">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400">
                  ✓
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">Yêu Cầu Đã Được Tiếp Nhận</h3>
                <p className="mt-2 max-w-md text-sm text-slate-300">
                  Cảm ơn bạn! Đội ngũ tư vấn {SITE_BRAND_NAME} sẽ nhanh chóng liên hệ lại để hỗ trợ bạn sớm nhất.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-xl border border-slate-700 bg-slate-800 px-6 py-2.5 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-white">Gửi Thông Tin Dự Án Của Bạn</h3>
                <p className="text-xs text-slate-400">
                  Điền ngắn gọn thông tin dưới đây, chúng tôi sẽ chuẩn bị trước đề xuất và demo phù hợp.
                </p>

                <div>
                  <label className="block text-xs font-medium text-slate-300">
                    Họ và tên của bạn / Tên doanh nghiệp *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: Anh Tuấn (Công ty ABC)"
                    className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300">
                    Thông tin liên hệ (Email hoặc Zalo/SĐT) *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập email hoặc số điện thoại của bạn"
                    className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300">
                    Nhu cầu trọng tâm của bạn
                  </label>
                  <select
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Website Doanh Nghiệp">Thiết kế Website Doanh Nghiệp</option>
                    <option value="Website Bán Hàng">Thiết kế Website Bán Hàng (E-Commerce)</option>
                    <option value="Web App Theo Yêu Cầu">Lập trình Web App theo yêu cầu</option>
                    <option value="Landing Page">Thiết kế Landing Page chạy Ads</option>
                    <option value="Vận Hành Hàng Tháng">Gói Vận Hành & Chăm Sóc Hàng Tháng</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300">
                    Mô tả yêu cầu hoặc website tham khảo (nếu có)
                  </label>
                  <textarea
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Mục tiêu kinh doanh, tính năng cần có hoặc thời gian dự kiến ra mắt..."
                    className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/25 transition hover:opacity-95"
                >
                  Gửi Yêu Cầu Tư Vấn Ngay
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
