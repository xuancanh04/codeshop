import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'
import { SITE_BRAND_NAME } from '../config/branding'

export default function HomePage() {
  const { projects } = useCatalog()
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="relative min-w-0 overflow-x-clip bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Glow Effects Background */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[650px] w-[min(100vw,1000px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18)_0%,rgba(147,51,234,0.12)_40%,transparent_70%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-10%] top-[400px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-[-10%] top-[900px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]"
        aria-hidden
      />

      {/* ========================================================
          1. HERO SECTION: Triết lý "Website là tài sản"
         ======================================================== */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Pill Kicker */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-4 py-1.5 text-xs font-semibold text-blue-300 shadow-lg shadow-blue-500/10 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="tracking-wide uppercase">TRIẾT LÝ DỊCH VỤ SỐ {SITE_BRAND_NAME.toUpperCase()}</span>
            <span className="text-blue-500">•</span>
            <span className="font-normal text-slate-300">Doanh nghiệp sở hữu 100%</span>
          </div>

          {/* Hero Main Heading */}
          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-[1.12]">
            Website là{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              tài sản số
            </span>
            .<br />
            Không phải khoản phí bỏ quên.
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {SITE_BRAND_NAME} định vị website là kênh sinh lời và tài sản lâu dài của doanh nghiệp. Chúng tôi bàn giao{' '}
            <span className="font-semibold text-white">100% mã nguồn & quyền sở hữu</span>, kết hợp đồng hành{' '}
            <span className="font-semibold text-cyan-400">vận hành hàng tháng</span> để liên tục mang lại khách hàng & doanh thu.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition duration-300 hover:scale-105 hover:shadow-cyan-500/25 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Nhận tư vấn phương án miễn phí
            </Link>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition duration-200 hover:border-slate-500 hover:bg-slate-800 hover:text-white"
            >
              Khám phá 150+ dự án
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* 4 Stat Highlights */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-md">
              <div className="text-3xl font-extrabold text-cyan-400">150+</div>
              <div className="mt-1 text-xs text-slate-400">Dự án đã triển khai</div>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-md">
              <div className="text-3xl font-extrabold text-blue-400">100%</div>
              <div className="mt-1 text-xs text-slate-400">Bàn giao toàn bộ quyền</div>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-md">
              <div className="text-3xl font-extrabold text-indigo-400">2 Tầng</div>
              <div className="mt-1 text-xs text-slate-400">Setup & Vận hành tháng</div>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-md">
              <div className="text-3xl font-extrabold text-emerald-400">24/7</div>
              <div className="mt-1 text-xs text-slate-400">Bảo mật & Giám sát uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. DỊCH VỤ SỐ HAI TẦNG CỐT LÕI
         ======================================================== */}
      <section id="tier-services" className="relative border-t border-slate-800/80 bg-slate-900/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">
              MÔ HÌNH HOẠT ĐỘNG KHÁC BIỆT
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Dịch Vụ Số Hai Tầng Lấy Website Làm Trọng Tâm
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400 text-sm sm:text-base">
              Khác với cách làm web truyền thống bàn giao xong bỏ mặc, {SITE_BRAND_NAME} kiến tạo nền móng vững chắc rồi cùng doanh nghiệp phát triển bền vững.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Tầng 01: Setup */}
            <div className="relative rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-950/40 via-slate-900/60 to-slate-950 p-8 shadow-2xl backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                TẦNG 01 • ĐẦU TƯ MỘT LẦN
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white">
                Xây Dựng Nền Móng (Gói Setup)
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Thiết kế & lập trình website doanh nghiệp, bán hàng hoặc Web App với triết lý trao trả trọn vẹn 100% quyền kiểm soát cho khách hàng.
              </p>

              <div className="mt-6 space-y-3.5">
                {[
                  'Nghiên cứu mục tiêu kinh doanh, chân dung và hành trình khách hàng',
                  'Thiết kế giao diện độc bản theo nhận diện thương hiệu riêng',
                  'Tối ưu chuẩn Technical SEO, tốc độ tải trang cực nhanh trên di động',
                  'Cài đặt công cụ đo lường chuyển đổi (GA4, Google Search Console)',
                  'Bàn giao 100% mã nguồn, tên miền, dữ liệu & tài khoản quản trị cao nhất',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                      ✓
                    </span>
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-900/20 p-4">
                <span className="text-xs font-bold uppercase text-cyan-300">Cam kết bản quyền:</span>
                <p className="mt-1 text-xs text-slate-300">
                  Doanh nghiệp đứng tên trực tiếp tên miền, sở hữu toàn vẹn source code, không lo bị gián đoạn hay phụ thuộc kỹ thuật.
                </p>
              </div>
            </div>

            {/* Tầng 02: Vận hành hàng tháng */}
            <div className="relative rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950 p-8 shadow-2xl backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
                TẦNG 02 • ĐỒNG HÀNH DÀI LÂU
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white">
                Vận Hành Hằng Tháng (Growth & Performance)
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Chăm sóc, bảo vệ và phát triển tài sản số hàng tháng để website không bị nguội lạnh, liên tục tạo ra khách hàng tiềm năng.
              </p>

              <div className="mt-6 space-y-3.5">
                {[
                  'Sao lưu dữ liệu tự động hằng đêm, vá lỗi bảo mật & giám sát uptime 24/7',
                  'Cập nhật nội dung, bài viết chuyên sâu & thông tin sản phẩm mới',
                  'Đẩy mạnh SEO từ khóa mục tiêu, thu hút khách hàng tìm kiếm tự nhiên',
                  'Tối ưu hóa tỷ lệ chuyển đổi (CRO) trên từng trang đích',
                  'Báo cáo hiệu suất số liệu minh bạch hàng tháng qua dashboard trực quan',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-400">
                      ✓
                    </span>
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-900/20 p-4">
                <span className="text-xs font-bold uppercase text-indigo-300">Linh hoạt theo giai đoạn:</span>
                <p className="mt-1 text-xs text-slate-300">
                  Chọn gói Basic (Giữ gìn an toàn), Growth (Phát triển SEO & nội dung) hoặc Performance (Tăng trưởng doanh thu & quảng cáo).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. DỰ ÁN TIÊU BIỂU (150+ DỰ ÁN ĐÃ THỰC HIỆN)
         ======================================================== */}
      <section id="projects" className="relative border-t border-slate-800/80 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">
                HỒ SƠ NĂNG LỰC THỰC CHIẾN
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                150+ Dự Án Đã Triển Khai
              </h2>
              <p className="mt-2 text-slate-400 text-sm">
                Minh chứng năng lực triển khai thực tế đa ngành: Doanh nghiệp, Bán hàng, Web App, Giải trí...
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'ecommerce', label: 'Bán hàng (E-Commerce)' },
                { id: 'enterprise', label: 'Website Doanh Nghiệp' },
                { id: 'webapp', label: 'Web App Tùy Biến' },
                { id: 'landing', label: 'Landing Page' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeCategory === c.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Project Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="rounded-full bg-slate-950/80 px-2.5 py-1 text-[11px] font-bold text-cyan-400 backdrop-blur-md">
                      {p.client}
                    </span>
                    <span className="rounded-full bg-blue-600/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                      ⏱ {p.timeline}
                    </span>
                  </div>
                </div>

                {/* Project Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-slate-800/90 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-white transition group-hover:text-cyan-400">
                    {p.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-400">
                    {p.shortDescription}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-4">
                    {p.features.slice(0, 3).map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <span className="text-cyan-400">✦</span>
                        <span className="line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                    <Link
                      to={`/product/${p.id}`}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      Chi tiết dự án →
                    </Link>
                    <Link
                      to="/contact"
                      className="rounded-lg bg-blue-600/20 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-600 hover:text-white transition"
                    >
                      Báo giá tương tự
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. BẢNG GIÁ & GÓI DỊCH VỤ MINH BẠCH
         ======================================================== */}
      <section id="pricing" className="relative border-t border-slate-800/80 bg-slate-900/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">
              BẢNG GIÁ DỊCH VỤ RÕ RÀNG
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Đầu Tư Minh Bạch — Không Chi Phí Ẩn
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400 text-sm">
              Lựa chọn linh hoạt giữa xây dựng nền móng ban đầu và các cấp độ vận hành hằng tháng.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Gói Basic */}
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-slate-400">VẬN HÀNH DUY TRÌ</span>
                <h3 className="mt-2 text-2xl font-bold text-white">Gói Basic</h3>
                <p className="mt-2 text-xs text-slate-400">
                  Dành cho website đã có nền tảng tốt, cần bảo vệ an ninh và ổn định 24/7.
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">Liên hệ</span>
                  <span className="text-xs text-slate-400">/ tháng</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">✓ Sao lưu dữ liệu tự động hằng đêm</li>
                  <li className="flex items-center gap-2">✓ Giám sát uptime & chứng chỉ SSL 24/7</li>
                  <li className="flex items-center gap-2">✓ Vá lỗi bảo mật định kỳ & chặn bot độc hại</li>
                  <li className="flex items-center gap-2">✓ Báo cáo tình trạng website hàng tháng</li>
                </ul>
              </div>

              <Link
                to="/contact"
                className="mt-8 block w-full rounded-xl border border-slate-700 bg-slate-900 py-3 text-center text-xs font-bold text-white hover:bg-slate-800"
              >
                Nhận tư vấn gói Basic
              </Link>
            </div>

            {/* Gói Growth (Phổ biến nhất) */}
            <div className="relative rounded-3xl border-2 border-blue-500 bg-gradient-to-b from-blue-950/60 to-slate-950 p-8 shadow-2xl flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-3.5 py-1 text-[11px] font-black uppercase text-white tracking-wider shadow-md">
                Phổ biến nhất
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-cyan-400">PHÁT TRIỂN TÀI SẢN</span>
                <h3 className="mt-2 text-2xl font-bold text-white">Gói Growth</h3>
                <p className="mt-2 text-xs text-slate-300">
                  Dành cho doanh nghiệp muốn mở rộng khách hàng tự nhiên qua Google & nội dung.
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-cyan-400">Ưu đãi</span>
                  <span className="text-xs text-slate-400">theo nhu cầu</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2 font-semibold text-cyan-300">
                    ★ Bao gồm toàn bộ quyền lợi gói Basic
                  </li>
                  <li className="flex items-center gap-2">✓ Sản xuất bài viết chuẩn SEO định kỳ</li>
                  <li className="flex items-center gap-2">✓ Tối ưu on-page & cải thiện thứ hạng tìm kiếm</li>
                  <li className="flex items-center gap-2">✓ Tinh chỉnh trải nghiệm người dùng (CRO)</li>
                  <li className="flex items-center gap-2">✓ Thiết kế banner sự kiện & khuyến mãi</li>
                </ul>
              </div>

              <Link
                to="/contact"
                className="mt-8 block w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-center text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:opacity-95"
              >
                Nhận đề xuất gói Growth
              </Link>
            </div>

            {/* Gói Performance */}
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-indigo-400">BỨT PHÁ DOANH THU</span>
                <h3 className="mt-2 text-2xl font-bold text-white">Gói Performance</h3>
                <p className="mt-2 text-xs text-slate-400">
                  Dành cho doanh nghiệp đặt mục tiêu số lượng lead, đơn hàng và doanh thu cụ thể.
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">Tùy biến</span>
                  <span className="text-xs text-slate-400">cam kết KPI</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2 font-semibold text-indigo-300">
                    ★ Bao gồm toàn bộ gói Growth
                  </li>
                  <li className="flex items-center gap-2">✓ Triển khai & tối ưu chiến dịch quảng cáo (Ads)</li>
                  <li className="flex items-center gap-2">✓ Tích hợp hệ thống CRM quản lý khách hàng</li>
                  <li className="flex items-center gap-2">✓ Xây dựng Landing Page chuyên biệt cho từng campaign</li>
                  <li className="flex items-center gap-2">✓ Báo cáo tuần & đo lường chi phí trên mỗi chuyển đổi</li>
                </ul>
              </div>

              <Link
                to="/contact"
                className="mt-8 block w-full rounded-xl border border-slate-700 bg-slate-900 py-3 text-center text-xs font-bold text-white hover:bg-slate-800"
              >
                Tư vấn gói Performance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. FAQ (CÂU HỎI THƯỜNG GẶP)
         ======================================================== */}
      <section className="relative border-t border-slate-800/80 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">
              GIẢI ĐÁP BĂN KHOĂN
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white">
              Câu Hỏi Thường Gặp Của Doanh Nghiệp
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              {
                q: 'Sau khi hoàn thành, tôi có được bàn giao mã nguồn không?',
                a: `Có, 100%. Triết lý cốt lõi của ${SITE_BRAND_NAME} là khách hàng là chủ nhân thực sự của tài sản số. Toàn bộ mã nguồn, tên miền, database và tài khoản quản trị đều được chuyển giao cho bạn, không giữ bất kỳ quyền nào để ràng buộc.`,
              },
              {
                q: 'Website của tôi mất bao lâu để hoàn thành?',
                a: 'Thời gian thực hiện phụ thuộc vào quy mô dự án: Landing Page thường mất từ 5-7 ngày; Website doanh nghiệp/bán hàng tiêu chuẩn từ 2-3 tuần; Hệ thống Web App nghiệp vụ từ 3-6 tuần.',
              },
              {
                q: `Tôi chưa có tên miền và hosting thì ${SITE_BRAND_NAME} có hỗ trợ không?`,
                a: `${SITE_BRAND_NAME} sẽ tư vấn và hỗ trợ bạn đăng ký tên miền chính chủ mang tên bạn hoặc doanh nghiệp, đồng thời cấu hình máy chủ/hosting tốc độ cao, cài đặt chứng chỉ bảo mật SSL miễn phí trọn đời.`,
              },
              {
                q: 'Gói vận hành hàng tháng có bắt buộc không?',
                a: 'Hoàn toàn không bắt buộc. Sau khi nhận bàn giao Gói Setup, nếu bạn có đội ngũ tự vận hành thì có thể tự quản lý. Gói vận hành hàng tháng là giải pháp dành cho doanh nghiệp muốn có chuyên gia kỹ thuật đồng hành chăm sóc và gia tăng khách hàng mà không cần tốn chi phí thuê nhân sự toàn thời gian.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md"
              >
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-cyan-400">?</span> {faq.q}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. BANNER LIÊN HỆ CUỐI TRANG
         ======================================================== */}
      <section className="relative border-t border-slate-800/80 bg-gradient-to-b from-blue-950/40 to-slate-950 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Sẵn sàng biến website thành tài sản sinh lời?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300 text-sm sm:text-base">
            Hãy liên hệ trực tiếp với đội ngũ {SITE_BRAND_NAME} để được khảo sát nhu cầu, lên phương án cấu trúc và báo giá tối ưu nhất.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500"
            >
              Liên hệ nhận tư vấn ngay
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
