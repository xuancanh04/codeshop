import { Link } from 'react-router-dom'
import { SITE_LOGO_ALT, SITE_LOGO_SRC } from '../config/branding'

const sizes = {
  md: {
    img: 'h-20 max-h-20 w-auto sm:h-24 sm:max-h-24',
    maxW: 'max-w-[min(640px,90vw)]',
    gap: 'gap-3',
  },
  sm: {
    img: 'h-20 max-h-20 w-auto sm:h-24 sm:max-h-24 lg:h-28 lg:max-h-28 xl:h-32 xl:max-h-32',
    maxW: 'max-w-[min(760px,96vw)]',
    gap: 'gap-3',
  },
}

/**
 * Logo thương hiệu — ảnh từ `SITE_LOGO_SRC` (object-contain).
 * @param {boolean} [fitHeader] — Giữ slot header cố định (h-10), phóng to bằng scale để thanh không cao thêm.
 * @param {() => void} [onClick] — Ví dụ đóng menu mobile khi bấm logo.
 */
export default function BrandLogo({ size = 'md', className = '', fitHeader = false, onClick }) {
  const s = sizes[size] ?? sizes.md

  if (fitHeader && size === 'md') {
    return (
      <Link
        to="/"
        onClick={onClick}
        className={`inline-flex h-10 max-h-10 items-center overflow-visible ${className}`}
      >
        <img
          src={SITE_LOGO_SRC}
          alt={SITE_LOGO_ALT}
          width={480}
          height={96}
          draggable={false}
          className="h-10 max-h-10 w-auto max-w-[min(460px,68vw)] origin-left scale-[2.45] object-contain object-left will-change-transform sm:max-w-[min(600px,62vw)] sm:scale-[2.72] dark:opacity-[0.98]"
        />
      </Link>
    )
  }

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`inline-flex items-center ${s.gap} ${className}`}
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
