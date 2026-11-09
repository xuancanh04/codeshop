import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'
import { useI18n } from '../context/I18nContext'
import { SITE_BRAND_NAME } from '../config/branding'

export default function HomePage() {
  const { t } = useI18n()
  const { projects } = useCatalog()
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="relative min-w-0 overflow-x-clip bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-300 bg-tech-grid">
      {/* Dynamic Animated Glow Orbs in Background */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[650px] w-[min(100vw,1000px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.2)_0%,rgba(147,51,234,0.12)_40%,transparent_70%)] blur-3xl animate-pulse-glow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-5%] top-[350px] h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-[130px] animate-float-slow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-[-5%] top-[850px] h-[520px] w-[520px] rounded-full bg-blue-600/15 blur-[130px] animate-float"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[10%] top-[1400px] h-[450px] w-[450px] rounded-full bg-indigo-500/10 blur-[120px] animate-float-slow"
        aria-hidden
      />

      {/* ========================================================
          1. HERO SECTION: Triết lý "Website là tài sản"
         ======================================================== */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Big Bold Typography */}
            <div className="lg:col-span-7 text-left">
              {/* Kicker Tag */}
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                <span className="text-cyan-500 font-extrabold text-sm">/</span>
                <span>{t('hero.kicker')}</span>
              </div>

              {/* Massive Title: WEBSITE LÀ TÀI SẢN */}
              <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-950 sm:text-7xl xl:text-8xl leading-[0.95] dark:text-white uppercase font-sans">
                {t('hero.mainTitle')}
              </h1>

              {/* Sub-line with Lime / Green Highlight Underline */}
              <div className="mt-3 relative inline-block">
                <div className="text-2xl sm:text-4xl xl:text-5xl font-extrabold text-blue-600 dark:text-cyan-400 lowercase tracking-normal">
                  {t('hero.subHighlight')}
                </div>
                <div className="absolute -bottom-1 left-0 right-0 h-2 sm:h-2.5 bg-lime-400/80 -rotate-1 rounded-sm -z-10" />
              </div>

              {/* Buttons: Trao đổi về dự án + Xem dự án đã thực hiện */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="shine-hover inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-xs font-bold text-white shadow-xl transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-400"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white dark:bg-slate-900">
                    💬
                  </span>
                  <span>{t('hero.ctaChat')}</span>
                  <span className="text-xs">↗</span>
                </Link>

                <a
                  href="#projects"
                  className="group inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 dark:text-slate-200 dark:hover:text-cyan-400 transition-colors py-2 px-3 underline decoration-slate-300 underline-offset-4 hover:decoration-blue-500"
                >
                  <span>{t('hero.ctaViewProjects')}</span>
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Philosophy + Floating Preview Mockups + Key Stats */}
            <div className="lg:col-span-5 text-left space-y-8">
              {/* Floating UI Mockup Cards (Phong cách kính mờ giống ảnh mẫu) */}
              <div className="relative rounded-3xl border border-slate-200/80 bg-white/70 p-5 shadow-2xl backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/60">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">codehub-digital-assets.vn</span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="h-20 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-50 dark:from-blue-950/60 dark:to-cyan-950/40 p-2 flex flex-col justify-end">
                    <span className="text-[9px] font-bold text-blue-600 dark:text-cyan-300">SETUP 1 LẦN</span>
                  </div>
                  <div className="h-20 rounded-xl bg-gradient-to-br from-cyan-100 to-emerald-50 dark:from-cyan-950/60 dark:to-emerald-950/40 p-2 flex flex-col justify-end">
                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-300">100% SỞ HỮU</span>
                  </div>
                  <div className="h-20 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-50 dark:from-indigo-950/60 dark:to-purple-950/40 p-2 flex flex-col justify-end">
                    <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-300">VẬN HÀNH THÁNG</span>
                  </div>
                </div>
              </div>

              {/* Subtitle paragraph đúng văn phong XimiTech nhưng mang thương hiệu người dùng */}
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {t('hero.philosophy', { brand: SITE_BRAND_NAME })}
              </p>

              {/* Stats Highlights khớp ảnh: 150+ và 100% */}
              <div className="grid grid-cols-2 gap-6 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white">
                    {t('hero.stat1Number')}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t('hero.stat1Label')}
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white">
                    {t('hero.stat2Number')}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t('hero.stat2Label')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. DỊCH VỤ SỐ HAI TẦNG CỐT LÕI
         ======================================================== */}
      <section id="tier-services" className="relative border-t border-slate-200 bg-slate-100/60 py-20 dark:border-slate-800/80 dark:bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-cyan-400">
              {t('tier.kicker')}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              {t('tier.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600 text-sm sm:text-base dark:text-slate-400">
              {t('tier.subtitle', { brand: SITE_BRAND_NAME })}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Tầng 01: Setup với hiệu ứng xoay viền phát sáng */}
            <div className="card-glow-border group relative rounded-3xl border border-blue-200 bg-white p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-blue-500/30 dark:bg-gradient-to-b dark:from-blue-950/40 dark:via-slate-900/60 dark:to-slate-950">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                {t('tier1.pill')}
              </div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                {t('tier1.title')}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {t('tier1.desc')}
              </p>

              <div className="mt-6 space-y-3.5">
                {[
                  'Nghiên cứu mục tiêu kinh doanh, chân dung và hành trình khách hàng',
                  'Thiết kế giao diện độc bản theo nhận diện thương hiệu riêng',
                  'Tối ưu chuẩn Technical SEO, tốc độ tải trang cực nhanh trên di động',
                  'Cài đặt công cụ đo lường chuyển đổi (GA4, Google Search Console)',
                  'Bàn giao 100% mã nguồn, tên miền, dữ liệu & tài khoản quản trị cao nhất',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 transition-transform duration-200 hover:translate-x-1">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                      ✓
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/50 p-4 transition duration-300 group-hover:bg-blue-50 dark:border-blue-500/20 dark:bg-blue-900/20 dark:group-hover:bg-blue-900/30">
                <span className="text-xs font-bold uppercase text-blue-700 dark:text-cyan-300">{t('tier1.commitmentLabel')}</span>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {t('tier1.commitment')}
                </p>
              </div>
            </div>

            {/* Tầng 02: Vận hành hàng tháng với hiệu ứng viền phát sáng */}
            <div className="card-glow-border group relative rounded-3xl border border-indigo-200 bg-white p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-indigo-500/30 dark:bg-gradient-to-b dark:from-indigo-950/40 dark:via-slate-900/60 dark:to-slate-950">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
                {t('tier2.pill')}
              </div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                {t('tier2.title')}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {t('tier2.desc')}
              </p>

              <div className="mt-6 space-y-3.5">
                {[
                  'Sao lưu dữ liệu tự động hằng đêm, vá lỗi bảo mật & giám sát uptime 24/7',
                  'Cập nhật nội dung, bài viết chuyên sâu & thông tin sản phẩm mới',
                  'Đẩy mạnh SEO từ khóa mục tiêu, thu hút khách hàng tìm kiếm tự nhiên',
                  'Tối ưu hóa tỷ lệ chuyển đổi (CRO) trên từng trang đích',
                  'Báo cáo hiệu suất số liệu minh bạch hàng tháng qua dashboard trực quan',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 transition-transform duration-200 hover:translate-x-1">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                      ✓
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4 transition duration-300 group-hover:bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-900/20 dark:group-hover:bg-indigo-900/30">
                <span className="text-xs font-bold uppercase text-indigo-700 dark:text-indigo-300">{t('tier2.commitmentLabel')}</span>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {t('tier2.commitment')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. DỰ ÁN TIÊU BIỂU (150+ DỰ ÁN ĐÃ THỰC HIỆN)
         ======================================================== */}
      <section id="projects" className="relative border-t border-slate-200 py-20 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-cyan-400">
                {t('projects.kicker')}
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
                {t('projects.title')}
              </h2>
              <p className="mt-2 text-slate-600 text-sm dark:text-slate-400">
                {t('projects.subtitle')}
              </p>
            </div>

            {/* Category Filter Pills với animation click */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: t('projects.filterAll') },
                { id: 'ecommerce', label: 'E-Commerce' },
                { id: 'enterprise', label: 'Enterprise' },
                { id: 'webapp', label: 'Web App' },
                { id: 'landing', label: 'Landing Page' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                    activeCategory === c.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
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
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-xl dark:hover:border-cyan-500/40 dark:hover:shadow-cyan-500/10"
              >
                {/* Project Image với zoom scale mượt */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80 dark:from-slate-950 dark:via-slate-950/30" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="rounded-full bg-slate-900/85 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md dark:bg-slate-950/85 dark:text-cyan-400">
                      {p.client}
                    </span>
                    <span className="rounded-full bg-blue-600/90 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-sm">
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
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 transition duration-200 group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-slate-800/90 dark:text-slate-300 dark:group-hover:bg-cyan-950/50 dark:group-hover:text-cyan-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-400">
                    {p.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {p.shortDescription}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 dark:border-slate-800/80">
                    {p.features.slice(0, 3).map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                        <span className="text-blue-600 dark:text-cyan-400 font-bold">✦</span>
                        <span className="line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between dark:border-slate-800/60">
                    <Link
                      to={`/product/${p.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition-all duration-200 hover:gap-2 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                    >
                      Chi tiết dự án <span>→</span>
                    </Link>
                    <Link
                      to="/contact"
                      className="rounded-xl bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-md dark:bg-blue-600/20 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
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
      <section id="pricing" className="relative border-t border-slate-200 bg-slate-100/50 py-20 dark:border-slate-800/80 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-cyan-400">
              {t('pricing.kicker')}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              {t('pricing.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600 text-sm dark:text-slate-400">
              {t('pricing.subtitle')}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Gói Basic */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between dark:border-slate-800 dark:bg-slate-950">
              <div>
                <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{t('pricing.basicBadge')}</span>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{t('pricing.basicTitle')}</h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                  {t('pricing.basicDesc')}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">Liên hệ</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/ tháng</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">✓ Sao lưu dữ liệu tự động hằng đêm</li>
                  <li className="flex items-center gap-2">✓ Giám sát uptime & chứng chỉ SSL 24/7</li>
                  <li className="flex items-center gap-2">✓ Vá lỗi bảo mật định kỳ & chặn bot độc hại</li>
                  <li className="flex items-center gap-2">✓ Báo cáo tình trạng website hàng tháng</li>
                </ul>
              </div>

              <Link
                to="/contact"
                className="mt-8 block w-full rounded-2xl border border-slate-300 bg-slate-50 py-3.5 text-center text-xs font-bold text-slate-700 transition duration-200 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                {t('pricing.basicCta')}
              </Link>
            </div>

            {/* Gói Growth (Phổ biến nhất - Có hiệu ứng Pulse Glow & Shine) */}
            <div className="relative rounded-3xl border-2 border-blue-600 bg-white p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-500/20 flex flex-col justify-between dark:border-blue-500 dark:bg-gradient-to-b dark:from-blue-950/60 dark:to-slate-950 glow-active">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1 text-[11px] font-black uppercase text-white tracking-wider shadow-lg">
                {t('pricing.growthPopular')}
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-blue-600 dark:text-cyan-400">{t('pricing.growthBadge')}</span>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{t('pricing.growthTitle')}</h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                  {t('pricing.growthDesc')}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-blue-600 dark:text-cyan-400">Ưu đãi</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">theo nhu cầu</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-2 font-semibold text-blue-600 dark:text-cyan-300">
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
                className="shine-hover mt-8 block w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-center text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition duration-200 hover:opacity-95"
              >
                {t('pricing.growthCta')}
              </Link>
            </div>

            {/* Gói Performance */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between dark:border-slate-800 dark:bg-slate-950">
              <div>
                <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">{t('pricing.perfBadge')}</span>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{t('pricing.perfTitle')}</h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                  {t('pricing.perfDesc')}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">Tùy biến</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">cam kết KPI</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-300">
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
                className="mt-8 block w-full rounded-2xl border border-slate-300 bg-slate-50 py-3.5 text-center text-xs font-bold text-slate-700 transition duration-200 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                {t('pricing.perfCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. FAQ (CÂU HỎI THƯỜNG GẶP)
         ======================================================== */}
      <section className="relative border-t border-slate-200 py-20 dark:border-slate-800/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-cyan-400">
              {t('faq.kicker')}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('faq.title')}
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              {
                q: t('faq.q1'),
                a: t('faq.a1'),
              },
              {
                q: t('faq.q2'),
                a: t('faq.a2'),
              },
              {
                q: t('faq.q3'),
                a: t('faq.a3'),
              },
              {
                q: t('faq.q4'),
                a: t('faq.a4'),
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-cyan-500/40"
              >
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 dark:text-white">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-cyan-950/70 dark:text-cyan-400">?</span>
                  {faq.q}
                </h4>
                <p className="mt-3 pl-8 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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
      <section className="relative border-t border-slate-200 bg-gradient-to-b from-blue-50 to-white py-16 dark:border-slate-800/80 dark:from-blue-950/40 dark:to-slate-950">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 text-sm sm:text-base dark:text-slate-300">
            {t('cta.subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="shine-hover inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-9 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:scale-105 hover:bg-blue-500 glow-active"
            >
              {t('cta.btn')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
