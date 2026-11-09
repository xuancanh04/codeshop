import { Link } from 'react-router-dom'
import { SITE_BRAND_NAME } from '../config/branding'

export default function ProfileCapacityPage() {
  const milestones = [
    { year: '150+', title: 'Dự án bàn giao', desc: 'Đã hoàn thành và chuyển giao 100% quyền sở hữu cho các doanh nghiệp đa ngành.' },
    { year: '99.8%', title: 'Uptime dịch vụ', desc: 'Hạ tầng máy chủ tốc độ cao, giám sát 24/7 và hệ thống backup định kỳ hàng ngày.' },
    { year: '100%', title: 'Chủ quyền tài sản số', desc: 'Bàn giao trọn gói mã nguồn sạch, tài khoản quản trị domain và cơ sở dữ liệu.' },
    { year: '30 Phút', title: 'Phản hồi kỹ thuật', desc: 'Đội ngũ chuyên viên túc trực giải quyết sự cố và đồng hành phát triển tính năng.' },
  ]

  const capabilities = [
    {
      icon: '🏛️',
      title: 'Thiết Kế Kiến Trúc & UI/UX Độc Bản',
      desc: 'Nghiên cứu hành vi người dùng, vẽ wireframe chi tiết, thiết kế giao diện theo bộ nhận diện độc quyền của doanh nghiệp, không sử dụng template dựng sẵn lỗi thời.',
    },
    {
      icon: '⚡',
      title: 'Công Nghệ Lập Trình Hiện Đại',
      desc: 'Stack công nghệ tiên tiến nhất: React, Tailwind CSS, Node.js, Next.js, kiến trúc Microservices và RESTful / GraphQL API bảo mật cao.',
    },
    {
      icon: '🛡️',
      title: 'Bảo Mật Đa Tầng & Sao Lưu Tự Động',
      desc: 'Cấu hình SSL, chống tấn công DDoS, tường lửa WAF, bảo mật cơ sở dữ liệu và tự động sao lưu dữ liệu sang nhiều vùng độc lập.',
    },
    {
      icon: '📈',
      title: 'Vận Hành & Tối Ưu Chuyển Đổi (CRO)',
      desc: 'Phân tích dữ liệu người dùng qua heatmap, đo lường tỷ lệ chuyển đổi, cải thiện tốc độ tải trang liên tục và cố vấn chiến lược SEO bền vững.',
    },
  ]

  const processSteps = [
    { step: '01', title: 'Khảo Sát & Xác Lập Mục Tiêu', desc: 'Tiếp nhận yêu cầu, phân tích đối tượng khách hàng mục tiêu và lập biên bản phạm vi công việc.' },
    { step: '02', title: 'Bóc Tách & Báo Giá Minh Bạch', desc: 'Lập bản chi tiết hạng mục, kiến trúc sitemap, cam kết thời gian và chi phí đầu tư chuẩn xác.' },
    { step: '03', title: 'Thiết Kế Wireframe & Giao Diện', desc: 'Khách hàng duyệt từng màn hình thiết kế trên Figma/Prototype trước khi tiến hành code.' },
    { step: '04', title: 'Lập Trình & Kiểm Thử Toàn Diện', desc: 'Phát triển trên môi trường Staging bí mật, kiểm thử bảo mật và độ tương thích mọi thiết bị.' },
    { step: '05', title: 'Bàn Giao 100% & Ký Nghiệm Thu', desc: 'Chuyển giao toàn bộ source code, tên miền, tài khoản máy chủ và hướng dẫn quản trị trực quan.' },
    { step: '06', title: 'Đồng Hành Vận Hành Định Kỳ', desc: 'Hỗ trợ kỹ thuật 24/7, cập nhật nội dung, bảo trì và đề xuất tối ưu tăng trưởng định kỳ.' },
  ]

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen py-16 sm:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
            HỒ SƠ NĂNG LỰC DOANH NGHIỆP
          </span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl text-slate-900 dark:text-white">
            Năng Lực Công Nghệ & Triển Khai {SITE_BRAND_NAME}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 text-sm sm:text-base dark:text-slate-400">
            Hồ sơ giới thiệu toàn diện về năng lực đội ngũ kỹ thuật, kinh nghiệm thực chiến 150+ dự án số và quy trình cam kết chất lượng độc bản.
          </p>
        </div>

        {/* Milestones Stats */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {milestones.map((m, i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
            >
              <div className="text-3xl font-black text-blue-600 dark:text-cyan-400 sm:text-4xl">
                {m.year}
              </div>
              <div className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                {m.title}
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Core Capabilities */}
        <div className="mt-20">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              TRỤ CỘT CHUYÊN MÔN
            </span>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl text-slate-900 dark:text-white">
              Năng Lực Công Nghệ Cốt Lõi
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/40"
              >
                <div className="text-4xl">{cap.icon}</div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6-Step Workflow */}
        <div className="mt-20">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
              QUY TRÌNH CHUẨN HÓA
            </span>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl text-slate-900 dark:text-white">
              6 Giai Đoạn Triển Khai Chặt Chẽ
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 relative overflow-hidden"
              >
                <span className="text-4xl font-black text-blue-500/15 dark:text-cyan-400/20 absolute right-4 top-4">
                  {step.step}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white relative">
                  {step.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400 relative">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Tải Hồ Sơ Năng Lực PDF hoặc Đặt Lịch Làm Việc Trực Tiếp
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Chúng tôi sẵn sàng cử chuyên viên cao cấp đến khảo sát trực tiếp tại trụ sở doanh nghiệp của bạn hoặc qua buổi họp Google Meet.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition duration-200 hover:opacity-95"
            >
              Đặt lịch làm việc cùng kỹ sư trưởng
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

