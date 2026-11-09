/** @type {string} */
export const defaultLocale = 'vi'

/** @type {Record<string, Record<string, string>>} */
export const messages = {
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.about': 'Về XimiTech',
    'nav.services': 'Dịch vụ',
    'nav.projects': 'Dự án',
    'nav.blog': 'Blog',
    'nav.pricing': 'Bảng giá',
    'nav.profileCapacity': 'Hồ sơ năng lực',
    'nav.careers': 'Tuyển dụng',
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
    'hero.kicker': 'THIẾT KẾ & PHÁT TRIỂN',
    'hero.mainTitle': 'WEBSITE LÀ TÀI SẢN',
    'hero.subHighlight': 'số của doanh nghiệp.',
    'hero.ctaChat': 'Trao đổi về dự án',
    'hero.ctaViewProjects': 'Xem dự án đã thực hiện',
    'hero.philosophy':
      'Đa số chủ doanh nghiệp coi website là khoản chi làm một lần rồi để đó. {brand} coi đó là tài sản: xây dựng nền móng, anh chị sở hữu 100%, rồi chúng tôi bảo vệ, giữ gìn và phát triển nó mỗi tháng để website mang về khách hàng.',
    'hero.stat1Number': '150+',
    'hero.stat1Label': 'DỰ ÁN ĐÃ TRIỂN KHAI, TÍNH CẢ TRƯỚC KHI LẬP CÔNG TY',
    'hero.stat2Number': '100%',
    'hero.stat2Label': 'MÃ NGUỒN, TÊN MIỀN, DỮ LIỆU ĐỨNG TÊN DOANH NGHIỆP',
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
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.pricing': 'Pricing',
    'nav.profileCapacity': 'Company Profile',
    'nav.careers': 'Careers',
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

    'hero.kicker': 'DESIGN & DEVELOPMENT',
    'hero.mainTitle': 'WEBSITES ARE ASSETS',
    'hero.subHighlight': 'digital assets of your business.',
    'hero.ctaChat': 'Discuss your project',
    'hero.ctaViewProjects': 'View completed projects',
    'hero.philosophy':
      'Most business owners treat a website as a one-time sunk expense. {brand} treats it as a digital asset: we build the foundation, you own 100%, and we maintain and grow it monthly to deliver ongoing customers.',
    'hero.stat1Number': '150+',
    'hero.stat1Label': 'PROJECTS DELIVERED ACROSS MULTIPLE SECTORS',
    'hero.stat2Number': '100%',
    'hero.stat2Label': 'SOURCE CODE, DOMAIN & DATA UNDER YOUR BUSINESS NAME',
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
