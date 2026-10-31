/** @type {string} */
export const defaultLocale = 'vi'

/** @type {Record<string, Record<string, string>>} */
export const messages = {
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.about': 'Về XimiTech',
    'nav.services': 'Dịch vụ 2 tầng',
    'nav.projects': 'Dự án (150+)',
    'nav.pricing': 'Bảng giá',
    'nav.contact': 'Liên hệ tư vấn',
    'nav.cart': 'Dự án đã chọn',
    'nav.profile': 'Hồ sơ',
    'nav.admin': 'Quản trị',
    'nav.login': 'Đăng nhập',
    'nav.signup': 'Đăng ký',
    'nav.logout': 'Đăng xuất',
    'nav.themeLight': 'Chế độ Sáng',
    'nav.themeDark': 'Chế độ Tối',
    'nav.menu': 'Menu',

    // Hero Section
    'hero.badge': 'TRIẾT LÝ SỐ XIMITECH',
    'hero.badgeHighlight': 'Sở hữu 100% tài sản',
    'hero.titleLine1': 'Website là tài sản số.',
    'hero.titleLine2': 'Không phải khoản phí bỏ quên.',
    'hero.subtitle':
      'XimiTech thiết kế website doanh nghiệp, Web App & giải pháp số theo mô hình 2 tầng: Bàn giao toàn bộ quyền làm chủ (mã nguồn, tên miền, dữ liệu) và đồng hành vận hành tăng trưởng khách hàng hàng tháng.',
    'hero.ctaConsult': 'Nhận tư vấn phương án',
    'hero.ctaExplore': 'Xem 150+ Dự án đã triển khai',
    'hero.stat1Number': '150+',
    'hero.stat1Label': 'Dự án triển khai thành công',
    'hero.stat2Number': '100%',
    'hero.stat2Label': 'Bàn giao mã nguồn & tên miền',
    'hero.stat3Number': '2 Tầng',
    'hero.stat3Label': 'Mô hình Setup & Vận hành',
    'hero.stat4Number': '24/7',
    'hero.stat4Label': 'Giám sát & bảo mật dữ liệu',

    // Services 2-Tier
    'tier.kicker': 'MÔ HÌNH DỊCH VỤ ĐỘC BẢN',
    'tier.title': 'Dịch Vụ Số Hai Tầng Lấy Website Làm Cốt Lõi',
    'tier.subtitle':
      'Giải quyết dứt điểm tình trạng website làm xong bị bỏ xó, lỗi thời và không tạo ra doanh thu.',
    'tier1.title': 'TẦNG 01: XÂY DỰNG NỀN MÓNG (SETUP ĐẦU TƯ 1 LẦN)',
    'tier1.desc': 'Khách hàng sở hữu hoàn toàn 100% tài nguyên: mã nguồn, tên miền, dữ liệu và quyền quản trị cao nhất.',
    'tier2.title': 'TẦNG 02: VẬN HÀNH HẰNG THÁNG (GROWTH & PERFORMANCE)',
    'tier2.desc': 'Đội ngũ chuyên nghiệp đồng hành bảo vệ, duy trì và phát triển tài sản để mang về khách hàng đều đặn.',

    // Pricing Packages
    'pricing.kicker': 'BẢNG GIÁ MINH BẠCH',
    'pricing.title': 'Chi Phí Đầu Tư Xứng Đáng & Không Phí Ẩn',
    'pricing.subtitle':
      'Tách bạch rõ ràng giữa chi phí xây dựng nền móng ban đầu và chi phí chăm sóc duy trì hàng tháng.',

    // Common
    'common.loading': 'Đang tải dữ liệu...',
    'common.error': 'Đã có lỗi xảy ra. Vui lòng thử lại.',
    'common.retry': 'Thử lại',
    'common.viewDetail': 'Xem chi tiết',
    'common.contactUs': 'Liên hệ ngay',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': '2-Tier Services',
    'nav.projects': 'Projects (150+)',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact Us',
    'nav.cart': 'Selected Projects',
    'nav.profile': 'Profile',
    'nav.admin': 'Admin',
    'nav.login': 'Log in',
    'nav.signup': 'Sign up',
    'nav.logout': 'Log out',
    'nav.themeLight': 'Light Mode',
    'nav.themeDark': 'Dark Mode',
    'nav.menu': 'Menu',

    'hero.badge': 'XIMITECH PHILOSOPHY',
    'hero.badgeHighlight': '100% Ownership',
    'hero.titleLine1': 'Websites are digital assets.',
    'hero.titleLine2': 'Not a cost left forgotten.',
    'hero.subtitle':
      'XimiTech crafts enterprise websites, custom web apps & digital solutions with a 2-tier service model: 100% code and domain ownership handed over, combined with monthly growth operations.',
    'hero.ctaConsult': 'Get Free Consultation',
    'hero.ctaExplore': 'Explore 150+ Projects',
    'hero.stat1Number': '150+',
    'hero.stat1Label': 'Projects Delivered',
    'hero.stat2Number': '100%',
    'hero.stat2Label': 'Ownership Handover',
    'hero.stat3Number': '2 Tiers',
    'hero.stat3Label': 'Setup & Growth Model',
    'hero.stat4Number': '24/7',
    'hero.stat4Label': 'Security & Uptime Monitoring',

    'tier.kicker': 'UNIQUE APPROACH',
    'tier.title': 'Two-Tier Digital Model Centered on Website Ownership',
    'tier.subtitle':
      'Eliminate the pitfall of websites being abandoned after launch with no business returns.',
    'tier1.title': 'TIER 01: FOUNDATION SETUP (ONE-TIME INVESTMENT)',
    'tier1.desc': 'Full 100% handover of source code, domain name, hosting control and system database.',
    'tier2.title': 'TIER 02: MONTHLY OPERATIONS (GROWTH & PERFORMANCE)',
    'tier2.desc': 'A dedicated technical and marketing team protecting and growing your digital asset.',

    'pricing.kicker': 'TRANSPARENT PRICING',
    'pricing.title': 'Clear Investment With Zero Hidden Fees',
    'pricing.subtitle':
      'Transparent separation between setup investment and ongoing monthly growth plans.',

    'common.loading': 'Loading...',
    'common.error': 'An error occurred. Please try again.',
    'common.retry': 'Retry',
    'common.viewDetail': 'View details',
    'common.contactUs': 'Contact us',
  },
}
