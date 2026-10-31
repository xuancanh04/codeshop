import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'
import { contactChannels } from '../config/contactChannels'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { loading, getById } = useCatalog()
  const project = id ? getById(id) : null

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!loading && !project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-28 text-center bg-slate-950 text-white">
        <h1 className="text-2xl font-bold">Không tìm thấy dự án</h1>
        <p className="mt-2 text-sm text-slate-400">Dự án này có thể đã cập nhật hoặc đổi đường dẫn.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-500"
        >
          Quay lại trang chủ
        </Link>
      </div>
    )
  }

  if (loading && !project) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-slate-950 text-slate-300">
        Đang tải thông tin dự án...
      </div>
    )
  }

  return (
    <div className="bg-slate-950 text-slate-100 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white">Trang chủ</Link>
          <span>/</span>
          <Link to="/#projects" className="hover:text-white">Dự án</Link>
          <span>/</span>
          <span className="text-cyan-400 truncate max-w-xs">{project.title}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          {/* Cột trái: Ảnh và mô tả chi tiết */}
          <div className="lg:col-span-7 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl aspect-video">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-white">Mô Tả Giải Pháp & Nghiệp Vụ</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {project.description}
              </p>

              <h3 className="mt-6 text-base font-bold text-white">Tính Năng Cốt Lõi Đã Triển Khai</h3>
              <ul className="mt-3 space-y-2.5 text-xs text-slate-300">
                {project.features?.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 text-base font-bold text-white">Công Nghệ & Kỹ Thuật Áp Dụng</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies?.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải: Thông tin dự án & CTA báo giá */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-950/40 to-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
              <div className="inline-flex rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                DỰ ÁN THỰC CHIẾN
              </div>

              <h1 className="mt-3 text-2xl font-black text-white sm:text-3xl leading-snug">
                {project.title}
              </h1>

              <div className="mt-4 flex items-center justify-between border-y border-slate-800 py-3 text-xs">
                <span className="text-slate-400">Khách hàng / Đối tác:</span>
                <span className="font-bold text-white">{project.client}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-3 text-xs">
                <span className="text-slate-400">Thời gian triển khai:</span>
                <span className="font-bold text-cyan-400">{project.timeline}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-3 text-xs">
                <span className="text-slate-400">Quyền sở hữu bàn giao:</span>
                <span className="font-bold text-emerald-400">100% Mã nguồn & Tên miền</span>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={contactChannels.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:opacity-95"
                >
                  Nhận báo giá dự án tương tự
                </a>
                <a
                  href={`tel:${contactChannels.phoneTel}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 py-3 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Gọi hotline tư vấn: {contactChannels.phoneDisplay}
                </a>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-[11px] text-slate-400">
                💡 <strong className="text-slate-200">XimiTech cam kết:</strong> Báo giá rõ ràng dựa trên mục tiêu thực tế, không chi phí ẩn, bàn giao đầy đủ mã nguồn và hỗ trợ bảo hành kỹ thuật 24/7.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
