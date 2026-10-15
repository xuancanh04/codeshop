import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import { contactChannels } from '../config/contactChannels'

const SOCIAL = [
  {
    href: 'https://facebook.com',
    label: 'Facebook',
    bg: 'bg-[#1877f2]',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    href: 'https://youtube.com',
    label: 'YouTube',
    bg: 'bg-[#ff0000]',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
]

const FOOTER_NAV = [
  {
    title: 'Source Code',
    links: [
      { label: 'Source Code Web (React, Node, Vue)', to: '/?cat=web' },
      { label: 'Source Code Mobile (Flutter, React Native)', to: '/?cat=mobile' },
      { label: 'Source Code Trí tuệ nhân tạo & AI', to: '/?cat=ai' },
      { label: 'Source Code Java & Spring Boot', to: '/?cat=java' },
    ],
  },
  {
    title: 'Hỗ trợ kỹ thuật',
    links: [
      { label: 'Dịch vụ cài đặt & Hỗ trợ demo', to: '/services' },
      { label: 'Liên hệ tư vấn mua code', to: '/contact' },
      { label: 'Chính sách bảo mật', to: '/legal/privacy' },
      { label: 'Điều khoản sử dụng license', to: '/legal/terms' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200/80 bg-slate-900 text-slate-300 dark:border-white/[0.08] dark:bg-[#07070a]">
      {/* Main footer body */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4 lg:col-span-2">
            <BrandLogo size="md" fitHeader className="dark:opacity-95" />
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Nền tảng học lập trình thực chiến và chia sẻ mã nguồn chất lượng cao dành cho học viên và sinh viên công nghệ thông tin. Lộ trình bài bản, hỗ trợ 1:1 tận tâm.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL.map(({ href, label, bg, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-md transition duration-200 hover:scale-105 ${bg}`}
                  aria-label={label}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 & 3: Navigation Links */}
          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((lnk) => (
                  <li key={lnk.label}>
                    <Link
                      to={lnk.to}
                      className="text-slate-400 transition hover:text-white hover:underline"
                    >
                      {lnk.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {year} CodeHub. Tất cả quyền được bảo lưu.</p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>Hotline: <a href={`tel:${contactChannels.phoneTel}`} className="font-medium text-slate-300 hover:underline">{contactChannels.phoneDisplay}</a></span>
            <span>•</span>
            <span>Email: <a href={`mailto:${contactChannels.supportEmail}`} className="font-medium text-slate-300 hover:underline">{contactChannels.supportEmail}</a></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
