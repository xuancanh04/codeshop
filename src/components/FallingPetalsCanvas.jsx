import { useEffect, useRef, useState } from 'react'

function shouldRunPetals() {
  if (typeof window === 'undefined') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function petalCount() {
  if (typeof window === 'undefined') return 48
  return window.matchMedia('(max-width: 640px)').matches ? 36 : 56
}

/** Bông tuyết 6 cánh — stroke để nét rõ trên nền sáng/tối */
function drawSnowflake(ctx, x, y, size, rotation, color, alpha) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.globalAlpha = alpha
  ctx.strokeStyle = color
  ctx.lineWidth = Math.max(0.85, size * 0.14)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  const r = size * 1.15
  for (let i = 0; i < 6; i++) {
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -r)
    ctx.moveTo(0, -r * 0.42)
    ctx.lineTo(-r * 0.3, -r * 0.6)
    ctx.moveTo(0, -r * 0.42)
    ctx.lineTo(r * 0.3, -r * 0.6)
    ctx.stroke()
    ctx.rotate(Math.PI / 3)
  }
  ctx.restore()
}

/**
 * Bông tuyết rơi: nền sáng — đen đậm; nền tối — trắng.
 */
export default function FallingPetalsCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const particlesRef = useRef(null)
  const [active] = useState(() => shouldRunPetals())

  useEffect(() => {
    if (!active) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

    const w = () => window.innerWidth
    const h = () => window.innerHeight

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const ww = w()
      const hh = h()
      canvas.width = Math.floor(ww * dpr)
      canvas.height = Math.floor(hh * dpr)
      canvas.style.width = `${ww}px`
      canvas.style.height = `${hh}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function seed() {
      const n = petalCount()
      const ww = w()
      const hh = h()
      particlesRef.current = Array.from({ length: n }, () => ({
        x: Math.random() * ww,
        y: Math.random() * hh,
        size: 3.2 + Math.random() * 4.8,
        vy: 0.35 + Math.random() * 0.95,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 0.4 + Math.random() * 0.9,
        swaySpeed: 0.012 + Math.random() * 0.018,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.04,
        strong: Math.random() > 0.42,
        jitter: Math.random() * 0.1,
      }))
    }

    resize()
    seed()

    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min((now - last) / 16.67, 2.2)
      last = now
      const ww = w()
      const hh = h()
      const dark = document.documentElement.classList.contains('dark')

      ctx.clearRect(0, 0, ww, hh)

      /* Sáng: đen đậm — 2 mức độ; tối: trắng rõ */
      const colorStrong = dark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
      const colorSoft = dark ? 'rgb(230, 230, 235)' : 'rgb(30, 30, 35)'

      for (const p of particlesRef.current) {
        p.swayPhase += p.swaySpeed * dt
        p.x += Math.sin(p.swayPhase) * p.swayAmp * 0.08 * dt
        p.y += p.vy * dt
        p.rot += p.vr * dt * 0.08

        if (p.y > hh + 12) {
          p.y = -8 - Math.random() * 40
          p.x = Math.random() * ww
        }
        if (p.x < -12) p.x = ww + 8
        if (p.x > ww + 12) p.x = -8

        const c = p.strong ? colorStrong : colorSoft
        /* Sáng: đen đậm (≈0.58–1); tối: trắng rõ (≈0.4–0.92) */
        const base = dark ? (p.strong ? 0.72 : 0.42) : p.strong ? 0.92 : 0.66
        const a = Math.min(base + p.jitter, 1)

        drawSnowflake(ctx, p.x, p.y, p.size, p.rot, c, a)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const onResize = () => {
      resize()
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-[9]"
      aria-hidden
    />
  )
}
