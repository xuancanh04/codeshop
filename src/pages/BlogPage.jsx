import { Link } from 'react-router-dom'
import { useState } from 'react'

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Website là tài sản số: Tại sao không nên bỏ quên sau khi nghiệm thu?',
    category: 'Tài sản số',
    date: '28/10/2026',
    readTime: '6 phút đọc',
    summary:
      'Nhiều doanh nghiệp chi hàng chục triệu làm website nhưng lại bỏ xó không ai chăm sóc. Xem cách biến website thành cỗ máy sinh lời và tài sản lâu dài.',
    slug: 'website-la-tai-san-so',
  },
  {
    id: 2,
    title: 'Bàn giao 100% mã nguồn & tên miền: Quyền lợi cốt lõi doanh nghiệp cần biết',
    category: 'Vận hành & Pháp lý',
    date: '25/10/2026',
    readTime: '5 phút đọc',
    summary:
      'Tránh bẫy bị giam giữ tên miền và mã nguồn khi thuê đơn vị thiết kế web. Hướng dẫn kiểm tra quyền sở hữu đầy đủ cho doanh nghiệp.',
    slug: 'ban-giao-100-phan-tram-ma-nguon',
  },
  {
    id: 3,
    title: 'So sánh Website Doanh Nghiệp vs Web App Nghiệp Vụ: Bạn thực sự cần gì?',
    category: 'Công nghệ',
    date: '20/10/2026',
    readTime: '8 phút đọc',
    summary:
      'Phân tích chi tiết sự khác nhau về kiến trúc, chi phí và mục đích sử dụng giữa website thông tin truyền thống và ứng dụng web nội bộ.',
    slug: 'so-sanh-website-va-web-app',
  },
  {
    id: 4,
    title: 'Tối ưu tốc độ tải trang dưới 1s: Tác động trực tiếp đến tỷ lệ chuyển đổi',
    category: 'Tối ưu & CRO',
    date: '15/10/2026',
    readTime: '4 phút đọc',
    summary:
      'Mỗi giây tải chậm làm mất 7% doanh số. Tìm hiểu các giải pháp kỹ thuật bộ nhớ đệm, tối ưu hình ảnh và CDN hiện đại.',
    slug: 'toi-uu-toc-do-tai-trang',
  },
  {
    id: 5,
    title: 'Mô hình Dịch vụ Số 2 Tầng: Bước đột phá trong thiết kế & vận hành web',
    category: 'Mô hình kinh doanh',
    date: '10/10/2026',
    readTime: '7 phút đọc',
    summary:
      'Cách tiếp cận mới giải quyết dứt điểm nghịch lý bỏ tiền làm web xong không có ai vận hành, cập nhật nội dung hay bảo mật định kỳ.',
    slug: 'mo-hinh-dich-vu-so-hai-tang',
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'Tài sản số', 'Vận hành & Pháp lý', 'Công nghệ', 'Tối ưu & CRO', 'Mô hình kinh doanh']

  const filtered =
    selectedCategory === 'all'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory)

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen py-16 sm:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
            BLOG & GÓC NHÌN CHUYÊN GIA
          </span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl text-slate-900 dark:text-white">
            Kiến Thức & Câu Chuyện Dự Án Số
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 text-sm sm:text-base dark:text-slate-400">
            Chia sẻ kinh nghiệm thực chiến về xây dựng website, vận hành tài sản số, tối ưu hóa tỷ lệ chuyển đổi và bảo mật cho doanh nghiệp.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 dark:bg-cyan-500 dark:text-slate-950'
                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat === 'all' ? 'Tất cả bài viết' : cat}
            </button>
          ))}
        </div>

        {/* Post Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="rounded-md bg-blue-50 px-2 py-1 font-semibold text-blue-600 dark:bg-blue-950/70 dark:text-cyan-400">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {post.summary}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <span>{post.date}</span>
                <span className="font-semibold text-blue-600 dark:text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Đọc tiếp →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-cyan-500/10 p-8 text-center backdrop-blur-md dark:border-cyan-500/20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Bạn cần một giải pháp số riêng cho ngành nghề của mình?
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Đội ngũ tư vấn sẽ đồng hành cùng bạn bóc tách bài toán và phác thảo lộ trình triển khai chi tiết.
          </p>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition duration-200 hover:opacity-95"
            >
              Liên hệ tư vấn chuyên sâu
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

