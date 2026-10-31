import { Link } from 'react-router-dom'
import { contactChannels } from '../config/contactChannels'

export default function ServicesPage() {
  return (
    <div className="bg-slate-950 text-slate-100 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            DỊCH VỤ SỐ TOÀN DIỆN
          </span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl text-white">
            Giải Pháp Số & Xây Dựng Website Cho Doanh Nghiệp
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400 text-sm sm:text-base">
            XimiTech cung cấp đầy đủ các hạng mục dịch vụ số chuyên sâu, từ khởi tạo nền móng ban đầu đến vận hành gia tăng giá trị thương hiệu.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-xl">
            <div className="text-3xl">🏢</div>
            <h3 className="mt-4 text-2xl font-bold text-white">Thiết Kế Website Doanh Nghiệp</h3>
            <p className="mt-2 text-sm text-slate-300">
              Khẳng định năng lực và uy tín thương hiệu trên internet. Giao diện thiết kế độc bản theo chuẩn nhận diện doanh nghiệp, cấu trúc rõ ràng, tích hợp tải profile, danh mục dịch vụ và chứng nhận pháp lý.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li>✓ Chuẩn SEO Technical on-page</li>
              <li>✓ Tương thích 100% mọi thiết bị di động, tablet, desktop</li>
              <li>✓ Bàn giao đầy đủ quyền quản trị & mã nguồn độc lập</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-xl">
            <div className="text-3xl">🛒</div>
            <h3 className="mt-4 text-2xl font-bold text-white">Website Thương Mại Điện Tử (E-Commerce)</h3>
            <p className="mt-2 text-sm text-slate-300">
              Hệ thống bán hàng trực quan, tối ưu hành trình mua sắm từ xem sản phẩm, bộ lọc nâng cao, giỏ hàng đến thanh toán chuyển khoản quét mã VietQR tự động.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li>✓ Trải nghiệm xem sản phẩm đa góc nhìn, biến thể màu sắc, size</li>
              <li>✓ Tốc độ tải trang cực nhanh, tối đa tỷ lệ chuyển đổi</li>
              <li>✓ Tích hợp hệ thống quản lý đơn hàng & tồn kho thông minh</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-xl">
            <div className="text-3xl">⚙️</div>
            <h3 className="mt-4 text-2xl font-bold text-white">Phát Triển Web App Nghiệp Vụ Theo Yêu Cầu</h3>
            <p className="mt-2 text-sm text-slate-300">
              Số hóa quy trình vận hành, quản lý dữ liệu, báo giá động, phân quyền nhân sự hoặc hệ sinh thái nội bộ dành riêng cho từng bài toán kinh doanh đặc thù.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li>✓ Kiến trúc hệ thống hiện đại, dễ bảo trì & mở rộng quy mô</li>
              <li>✓ Kết nối API bên thứ 3 (Zalo ZNS, SMS, Cổng thanh toán, CRM)</li>
              <li>✓ Bảo mật dữ liệu cao cấp, phân quyền đa cấp bậc</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-xl">
            <div className="text-3xl">🚀</div>
            <h3 className="mt-4 text-2xl font-bold text-white">Landing Page Tối Ưu Chuyển Đổi (CRO)</h3>
            <p className="mt-2 text-sm text-slate-300">
              Trang đích phục vụ chiến dịch quảng cáo Facebook, Google Ads, TikTok Ads hoặc sự kiện mở bán sản phẩm mới. Tối ưu điểm chất lượng quảng cáo và gia tăng đơn hàng.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li>✓ Kỹ thuật tâm lý dẫn dắt khách hàng chốt hành động</li>
              <li>✓ Đo lường chi tiết sự kiện click, cuộn trang, điền form</li>
              <li>✓ Tải trang tức thì dưới 1 giây</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href={contactChannels.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:opacity-95"
          >
            Liên hệ tư vấn phương án dịch vụ qua Zalo
          </a>
        </div>
      </div>
    </div>
  )
}
