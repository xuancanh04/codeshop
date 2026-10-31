import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import { contactChannels } from '../config/contactChannels'
import { SITE_BRAND_NAME } from '../config/branding'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Thông tin công ty */}
          <div className="space-y-4 lg:col-span-2">
            <BrandLogo />
            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              {SITE_BRAND_NAME} — Đơn vị tiên phong cung cấp giải pháp thiết kế website doanh nghiệp, Web App và vận hành số theo mô hình 2 tầng với triết lý coi website là tài sản số độc quyền của khách hàng.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <p>
                <strong className="text-white">Hotline / Zalo:</strong>{' '}
                <a
                  href={`tel:${contactChannels.phoneTel}`}
                  className="font-bold text-cyan-400 hover:underline"
                >
                  {contactChannels.phoneDisplay}
                </a>
              </p>
              <p>
                <strong className="text-white">Email:</strong>{' '}
                <a
                  href={`mailto:${contactChannels.supportEmail}`}
                  className="text-slate-300 hover:underline"
                >
                  {contactChannels.supportEmail}
                </a>
              </p>
            </div>
          </div>

          {/* Dịch vụ cốt lõi */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Dịch Vụ Cốt Lõi</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <a href="/#tier-services" className="hover:text-white transition">
                  Gói Setup Nền Móng (Đầu tư 1 lần)
                </a>
              </li>
              <li>
                <a href="/#tier-services" className="hover:text-white transition">
                  Gói Vận Hành Hàng Tháng (Growth)
                </a>
              </li>
              <li>
                <a href="/#tier-services" className="hover:text-white transition">
                  Gói Tăng Trưởng Doanh Thu (Performance)
                </a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-white transition">
                  Thiết kế Website Doanh Nghiệp
                </a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-white transition">
                  Phát triển Web App theo yêu cầu
                </a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-white transition">
                  Thiết kế Landing Page chuyển đổi cao
                </a>
              </li>
            </ul>
          </div>

          {/* Dự án tiêu biểu */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Dự Án Nổi Bật</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link to="/product/1" className="hover:text-white transition">
                  VinFast Huy Hiệu (33+ Mẫu xe 360°)
                </Link>
              </li>
              <li>
                <Link to="/product/2" className="hover:text-white transition">
                  HQN Group (Xây dựng & Kiến trúc)
                </Link>
              </li>
              <li>
                <Link to="/product/3" className="hover:text-white transition">
                  Court Vision (Vợt Pickleball & NFC)
                </Link>
              </li>
              <li>
                <Link to="/product/4" className="hover:text-white transition">
                  Aplus Billiards (Bàn bida thi đấu)
                </Link>
              </li>
              <li>
                <Link to="/product/5" className="hover:text-white transition">
                  LOOP Beer Club (Giao diện Nightlife)
                </Link>
              </li>
            </ul>
          </div>

          {/* Cam kết & Chính sách */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Cam Kết {SITE_BRAND_NAME}</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li className="text-slate-300">✓ 100% Khách hàng làm chủ mã nguồn</li>
              <li className="text-slate-300">✓ Tên miền đứng tên doanh nghiệp</li>
              <li className="text-slate-300">✓ Báo giá minh bạch, không phí ẩn</li>
              <li className="text-slate-300">✓ Hỗ trợ kỹ thuật tận tâm 24/7</li>
              <li className="pt-2">
                <Link to="/legal/privacy" className="hover:text-white transition">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="hover:text-white transition">
                  Quy định sử dụng & Bàn giao
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-6 text-[11px] text-slate-500 sm:flex-row">
          <p>© {year} {SITE_BRAND_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Phong cách nền tảng số hiện đại</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
