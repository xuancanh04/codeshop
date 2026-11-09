import { useEffect, useState } from 'react'
import { SITE_BRAND_NAME, SITE_LOGO_SRC, SITE_LOGO_ALT } from '../config/branding'

export default function PreloaderScreen() {
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem('codehub_preloaded')
  })
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Đang khởi tạo tài nguyên...')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (!shouldRender) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }

        // Tăng tốc độ mượt mà ngẫu nhiên
        const increment = Math.floor(Math.random() * 8) + 3
        const next = Math.min(prev + increment, 100)

        if (next < 35) {
          setStatusText('Đang tải cấu trúc dữ liệu...')
        } else if (next < 70) {
          setStatusText('Đang nạp mô hình giải pháp số...')
        } else if (next < 95) {
          setStatusText('Đang đồng bộ giao diện...')
        } else {
          setStatusText('Đang hoàn tất...')
        }

        return next
      })
    }, 45)

    return () => clearInterval(interval)
  }, [shouldRender])

  useEffect(() => {
    if (progress === 100) {
      sessionStorage.setItem('codehub_preloaded', 'true')
      const timer = setTimeout(() => {
        setIsDone(true)
      }, 350)
      const removeTimer = setTimeout(() => {
        setShouldRender(false)
      }, 950)
      return () => {
        clearTimeout(timer)
        clearTimeout(removeTimer)
      }
    }
  }, [progress])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070b14] text-white transition-opacity duration-700 ease-out select-none ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Radial Glow */}
      <div
        className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-[120px]"
        aria-hidden
      />

      <div className="relative flex flex-col items-center">
        {/* Logo Icon & Brand */}
        <div className="relative flex flex-col items-center">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900/80 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
            <img
              src={SITE_LOGO_SRC}
              alt={SITE_LOGO_ALT}
              className="h-12 w-auto object-contain transition-transform duration-300 animate-pulse"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            {/* Fallback ký hiệu công nghệ nếu logo ảnh chưa load */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-3xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                X
              </span>
            </div>
          </div>

          <h2 className="mt-4 text-xl font-black tracking-tight text-white sm:text-2xl">
            {SITE_BRAND_NAME}
          </h2>
        </div>

        {/* Số % đếm ngược */}
        <div className="mt-7 font-mono text-3xl font-extrabold tracking-wider text-white sm:text-4xl">
          {progress}%
        </div>

        {/* Thanh Progress Bar */}
        <div className="relative mt-4 h-1.5 w-64 overflow-hidden rounded-full bg-slate-800/80 sm:w-80 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 shadow-md shadow-cyan-400/50 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Chữ trạng thái */}
        <p className="mt-3.5 text-xs font-medium tracking-wide text-slate-400">
          {statusText}
        </p>
      </div>
    </div>
  )
}
