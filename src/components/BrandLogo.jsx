import { Link } from 'react-router-dom'
import { SITE_LOGO_ALT, SITE_LOGO_SRC } from '../config/branding'

const sizes = {
  md: {
    img: 'h-16 max-h-16 w-auto sm:h-20 sm:max-h-20',
    maxW: 'max-w-[min(380px,80vw)]',
    gap: 'gap-3',
  },
  sm: {
    img: 'h-12 max-h-12 w-auto sm:h-14 sm:max-h-14',
    maxW: 'max-w-[min(280px,70vw)]',
    gap: 'gap-3',
  },
}

/**
 * Logo thương hiệu — ảnh từ `SITE_LOGO_SRC` (object-contain).
 * @param {boolean} [fitHeader] — Kích thước gọn cho navbar, không scale (tránh tràn mobile).
 * @param {() => void} [onClick] — Ví dụ đóng menu mobile khi bấm logo.
 */
export default function BrandLogo({ size = 'md', className = '', fitHeader = false, onClick }) {
  const s = sizes[size] ?? sizes.md

  const headerBox =
    size === 'sm'
      ? 'h-9 w-[min(140px,40vw)] sm:h-9.5 sm:w-[min(160px,34vw)]'
      : 'h-10 w-[min(160px,44vw)] sm:h-10 sm:w-[min(180px,38vw)]'

  if (fitHeader) {
    return (
      <Link
        to="/"
        onClick={onClick}
        className={`inline-flex shrink-0 items-center ${headerBox} ${className}`}
      >
        <img
          src={SITE_LOGO_SRC}
          alt={SITE_LOGO_ALT}
          width={480}
          height={96}
          draggable={false}
          className="h-12 sm:h-14 w-auto max-w-none object-contain object-left dark:opacity-[0.98]"
        />
      </Link>
    )
  }

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`inline-flex max-w-full min-w-0 items-center overflow-hidden ${s.gap} ${className}`}
    >
      <img
        src={SITE_LOGO_SRC}
        alt={SITE_LOGO_ALT}
        width={480}
        height={112}
        draggable={false}
        className={`${s.img} ${s.maxW} shrink-0 object-contain object-left dark:opacity-[0.98]`}
      />
    </Link>
  )
}
