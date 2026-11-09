import { Link, useSearchParams } from 'react-router-dom'
import { SITE_BRAND_NAME } from '../config/branding'

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('type') || 'all'

  const handleSelectCategory = (catId) => {
    if (catId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ type: catId })
    }
  }

  const serviceCategories = [
    { id: 'all', name: 'Tất cả dịch vụ' },
    { id: 'enterprise', name: 'Website Doanh nghiệp' },
    { id: 'ecommerce', name: 'Website Bán hàng' },
    { id: 'webapp', name: 'Web App Theo Yêu Cầu' },
    { id: 'seo', name: 'Dịch vụ SEO & Tối ưu' },
    { id: 'landing', name: 'Landing Page Chuyển đổi' },
  ]

  const serviceList = [
    {
      id: 'enterprise',
      icon: '🏢',
      badge: 'NỀN TẢNG THƯƠNG HIỆU',
      title: 'Thiết Kế Website Doanh Nghiệp',
      shortDesc: 'Khẳng định vị thế và uy tín thương hiệu trên internet với cấu trúc chỉn chu, hồ sơ năng lực số.',
      fullDesc:
        'Website công ty là bộ mặt đại diện trực tiếp cho uy tín doanh nghiệp khi đối tác, khách hàng thẩm định năng lực. CodeHub xây dựng website doanh nghiệp độc bản, chuẩn nhận diện thương hiệu, bàn giao 100% mã nguồn và toàn quyền quản trị.',
      highlights: [
        'Chuẩn SEO Technical On-page & Schema doanh nghiệp',
        'Giao diện UI/UX thiết kế độc quyền theo nhận diện thương hiệu',
        'Tương thích 100% mọi kích thước màn hình (Mobile, Tablet, 4K Desktop)',
        'Tích hợp tính năng tải Profile PDF, giới thiệu ban lãnh đạo & đối tác',
        'Bàn giao 100% source code sạch, không phụ thuộc nền tảng đóng',
      ],
      deliverables: 'Mã nguồn + Tên miền chính chủ + Tài khoản Hosting/Server + Hướng dẫn quản trị',
    },
    {
      id: 'ecommerce',
      icon: '🛒',
      badge: 'TỐI ƯU CHUYỂN ĐỔI',
      title: 'Website Bán Hàng & Thương Mại Điện Tử',
      shortDesc: 'Hệ thống bán hàng trực quan, thanh toán tự động VietQR, quản lý đơn hàng & tồn kho thông minh.',
      fullDesc:
        'Giải pháp thương mại điện tử chuyên sâu giúp doanh nghiệp tự chủ kênh phân phối số. Không phải trả phí hoa hồng theo từng đơn như trên sàn thương mại điện tử, toàn quyền sở hữu danh sách khách hàng và dữ liệu mua hàng.',
      highlights: [
        'Trải nghiệm sản phẩm đa góc nhìn, biến thể màu sắc, kích thước, video',
        'Thanh toán chuyển khoản quét mã VietQR tự động xác nhận đơn hàng',
        'Hệ thống quản lý kho, trạng thái đơn hàng & phân loại khách hàng',
        'Tốc độ tải trang siêu tốc dưới 1 giây, giữ chân người mua hàng',
        'Tích hợp thông báo đơn hàng mới qua Telegram / Email / Zalo ZNS',
      ],
      deliverables: 'Hệ thống E-Commerce hoàn chỉnh + CMS quản lý sản phẩm + Cổng thanh toán',
    },
    {
      id: 'webapp',
      icon: '⚙️',
      badge: 'SỐ HÓA NGHIỆP VỤ',
      title: 'Phát Triển Web App Nghiệp Vụ Theo Yêu Cầu',
      shortDesc: 'Xây dựng ứng dụng web quản lý nội bộ, phần mềm phân quyền, CRM & tự động hóa quy trình.',
      fullDesc:
        'Khi các phần mềm đóng gói sẵn trên thị trường không đáp ứng đúng luồng xử lý thực tế của doanh nghiệp, CodeHub phát triển giải pháp Web App custom may đo chính xác theo nghiệp vụ vận hành của bạn.',
      highlights: [
        'Phân quyền tài khoản đa cấp bậc (Admin, Quản lý chi nhánh, Nhân viên, Đại lý)',
        'Báo cáo thống kê trực quan với biểu đồ doanh số, tiến độ thời gian thực',
        'Kết nối API bên thứ 3: Phần mềm kế toán, giao vận, Zalo ZNS, SMS Gateway',
        'Kiến trúc hệ thống mở rộng linh hoạt, bảo mật dữ liệu cấp doanh nghiệp',
        'Tương thích mượt mà trên trình duyệt di động mà không cần cài đặt App store',
      ],
      deliverables: 'Source code Web App + Database Schema + Tài liệu API + Bảo hành kỹ thuật dài hạn',
    },
    {
      id: 'seo',
      icon: '📈',
      badge: 'TĂNG TRƯỞNG BỀN VỮNG',
      title: 'Dịch Vụ SEO & Tối Ưu Website Toàn Diện',
      shortDesc: 'Kiểm toán Technical SEO, tối ưu tốc độ tải trang, cấu trúc Semantic Web và bứt phá thứ hạng Google.',
      fullDesc:
        'Chiến lược SEO kỹ thuật và nội dung bền vững, giúp website liên tục thu hút lượng khách hàng tiềm năng tự nhiên (Organic Traffic) từ Google mà không phải phụ thuộc hoàn toàn vào ngân sách quảng cáo.',
      highlights: [
        'Audit toàn diện lỗi kỹ thuật: Crawl budget, Broken links, Core Web Vitals',
        'Tối ưu On-page: Semantic HTML5, Heading hierarchy, Internal linking',
        'Cấu trúc dữ liệu có cấu trúc Schema.org chuyên sâu (Organization, Product, FAQ)',
        'Tối ưu hóa hình ảnh chuẩn WebP/AVIF và tốc độ hiển thị LCP dưới 1.5s',
        'Nghiên cứu bộ từ khóa theo ý định tìm kiếm (Search Intent) của khách mua hàng',
      ],
      deliverables: 'Báo cáo Audit chi tiết + Triển khai tối ưu kỹ thuật trực tiếp + Báo cáo thứ hạng',
    },
    {
      id: 'landing',
      icon: '🚀',
      badge: 'BỨT PHÁ DOANH SỐ',
      title: 'Landing Page Tối Ưu Chuyển Đổi (CRO)',
      shortDesc: 'Trang đích phục vụ chiến dịch quảng cáo Facebook, Google Ads, TikTok Ads với tỷ lệ chốt đơn cao.',
      fullDesc:
        'Thiết kế trang đích đánh trúng tâm lý khách hàng, bố cục mạch lạc dẫn dắt từ nỗi đau đến giải pháp và nút hành động kêu gọi mua hàng (CTA) rõ ràng, giúp tối ưu chi phí quảng cáo và tăng lợi nhuận.',
      highlights: [
        'Áp dụng các mô hình tâm lý thuyết phục (AIDA, PAS) vào cấu trúc nội dung',
        'Đo lường chi tiết hành vi: Heatmap cuộn trang, tỷ lệ nhấp nút, bỏ giỏ',
        'Tốc độ tải cực nhanh, điểm chất lượng Google PageSpeed Insights 95+',
        'Gắn sẵn mã theo dõi Meta Pixel, Google Tag Manager, TikTok Pixel',
        'Form thu thập thông tin khách hàng chống spam thông minh',
      ],
      deliverables: 'Landing Page hoàn chỉnh + Mã tracking quảng cáo + Bàn giao toàn quyền',
    },
  ]

  const filteredServices =
    activeCategory === 'all'
      ? serviceList
      : serviceList.filter((s) => s.id === activeCategory)

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen py-16 sm:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
            HỆ SINH THÁI DỊCH VỤ SỐ
          </span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl text-slate-900 dark:text-white">
            Các Dịch Vụ Thiết Kế & Phát Triển Của {SITE_BRAND_NAME}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 text-sm sm:text-base dark:text-slate-400">
            Cung cấp đầy đủ các hạng mục từ khởi tạo nền móng website đến ứng dụng web nghiệp vụ và tối ưu tăng trưởng doanh thu hàng tháng.
          </p>
        </div>

        {/* Filter categories */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 dark:bg-cyan-500 dark:text-slate-950'
                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Service cards */}
        <div className="mt-14 space-y-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-cyan-500/40"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{service.icon}</span>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                        {service.badge}
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {service.fullDesc}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-3">
                      Đặc điểm nổi bật & Cam kết:
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                      {service.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 dark:text-cyan-400 font-bold">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">Phạm vi bàn giao: </span>
                    <span className="text-slate-600 dark:text-slate-300">{service.deliverables}</span>
                  </div>
                </div>

                <div className="w-full lg:w-72 shrink-0 rounded-2xl bg-gradient-to-b from-slate-50 to-white p-6 border border-slate-200 dark:from-slate-800/60 dark:to-slate-900/80 dark:border-slate-700/60 flex flex-col justify-between self-stretch">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Hình thức triển khai</div>
                    <div className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                      Bàn giao trọn gói 100%
                    </div>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      Được khảo sát, lên kiến trúc và demo giao diện trước khi triển khai.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Link
                      to="/contact"
                      className="shine-hover flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition duration-200 hover:opacity-95"
                    >
                      Nhận tư vấn & Báo giá
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-900 dark:hover:bg-cyan-400 dark:hover:text-slate-950"
          >
            Liên hệ thảo luận bài toán doanh nghiệp
          </Link>
        </div>
      </div>
    </div>
  )
}

