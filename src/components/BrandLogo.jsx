import { Link } from 'react-router-dom'
import { SITE_LOGO_ALT, SITE_LOGO_SRC } from '../config/branding'

const sizes = {
  md: {
    img: 'h-12 max-h-12 w-auto sm:h-14 sm:max-h-14',
    maxW: 'max-w-[min(280px,72vw)]',
    gap: 'gap-3',
  },
  sm: {
    img: 'h-10 max-h-10 w-auto sm:h-12 sm:max-h-12',
    maxW: 'max-w-[min(220px,65vw)]',
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
      ? 'h-8 max-h-8 w-[min(120px,38vw)] sm:h-9 sm:max-h-9 sm:w-[min(148px,32vw)]'
      : 'h-9 max-h-9 w-[min(132px,40vw)] sm:h-10 sm:max-h-10 sm:w-[min(168px,36vw)]'

  if (fitHeader) {
    return (
      <Link
        to="/"
        onClick={onClick}
        className={`inline-flex shrink-0 items-center overflow-hidden ${headerBox} ${className}`}
      >
        <img
          src={SITE_LOGO_SRC}
          alt={SITE_LOGO_ALT}
          width={480}
          height={96}
          draggable={false}
          className="h-full w-full object-contain object-left dark:opacity-[0.98]"
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
