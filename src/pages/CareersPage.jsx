import { Link } from 'react-router-dom'
import { SITE_BRAND_NAME } from '../config/branding'

export default function CareersPage() {
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend React / Next.js Engineer',
      type: 'Toàn thời gian',
      location: 'Hà Nội / Remote',
      salary: '25.000.000 - 40.000.000 VNĐ',
      desc: 'Phát triển các hệ thống Web App, giao diện website doanh nghiệp cao cấp với React, Vite, Tailwind CSS, hiệu năng cao.',
      tags: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'TypeScript'],
    },
    {
      id: 2,
      title: 'Fullstack Node.js / Python Developer',
      type: 'Toàn thời gian',
      location: 'Hà Nội / Hybrid',
      salary: '28.000.000 - 45.000.000 VNĐ',
      desc: 'Xây dựng kiến trúc backend, REST API / GraphQL, tích hợp cổng thanh toán, hệ thống xác thực và tối ưu cơ sở dữ liệu.',
      tags: ['Node.js', 'PostgreSQL', 'Docker', 'Redis', 'Python'],
    },
    {
      id: 3,
      title: 'UI/UX & Product Designer (Figma)',
      type: 'Toàn thời gian',
      location: 'Hà Nội / Remote',
      salary: '18.000.000 - 30.000.000 VNĐ',
      desc: 'Thiết kế giao diện người dùng, wireframe và prototype cho các dự án số độc bản của đối tác doanh nghiệp.',
      tags: ['Figma', 'Design System', 'UI/UX', 'Prototype'],
    },
    {
      id: 4,
      title: 'Chuyên Viên Tư Vấn Giải Pháp Số & Dự Án',
      type: 'Toàn thời gian',
      location: 'Hà Nội',
      salary: '15.000.000 - 35.000.000 VNĐ + Thưởng dự án',
      desc: 'Khảo sát nhu cầu khách hàng doanh nghiệp, bóc tách bài toán công nghệ và đồng hành tư vấn phương án kiến trúc website.',
      tags: ['B2B Sales', 'Tư vấn giải pháp', 'Giao tiếp tốt'],
    },
  ]

  const benefits = [
    { icon: '🚀', title: 'Công Nghệ Tiên Tiến', desc: 'Được làm việc với stack công nghệ hiện đại, ứng dụng AI hỗ trợ lập trình.' },
    { icon: '💰', title: 'Thu Nhập Cạnh Tranh', desc: 'Lương thưởng minh bạch theo năng lực, thưởng dự án theo từng đợt nghiệm thu.' },
    { icon: '🕒', title: 'Thời Gian Linh Hoạt', desc: 'Môi trường làm việc cởi mở, chế độ Hybrid / Remote linh hoạt.' },
    { icon: '🌱', title: 'Lộ Trình Phát Triển', desc: 'Được tham gia các dự án thực tế quy mô lớn, đào tạo nâng cấp kỹ năng định kỳ.' },
  ]

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen py-16 sm:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
            CƠ HỘI NGHỀ NGHIỆP
          </span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl text-slate-900 dark:text-white">
            Gia Nhập Đội Ngũ Công Nghệ {SITE_BRAND_NAME}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 text-sm sm:text-base dark:text-slate-400">
            Cùng chúng tôi tạo dựng những tài sản số giá trị thực cho hàng trăm doanh nghiệp. Môi trường công nghệ chuyên nghiệp và đãi ngộ xứng đáng.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 text-center"
            >
              <div className="text-3xl">{b.icon}</div>
              <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">{b.title}</h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Job Listings */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              VỊ TRÍ ĐANG TUYỂN DỤNG
            </span>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl text-slate-900 dark:text-white">
              Tìm Vị Trí Phù Hợp Với Bạn
            </h2>
          </div>

          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400">
                      {job.type}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">📍 {job.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-400 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                    {job.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mức lương dự kiến</div>
                  <div className="text-base font-bold text-blue-600 dark:text-cyan-400 mt-1">
                    {job.salary}
                  </div>
                  <Link
                    to="/contact"
                    className="mt-3 inline-flex items-center gap-1 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-900 dark:hover:bg-cyan-400 dark:hover:text-slate-950"
                  >
                    Ứng tuyển ngay →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
