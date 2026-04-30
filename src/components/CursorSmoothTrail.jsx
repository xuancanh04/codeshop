import { useEffect, useRef, useState } from 'react'

const TRAIL_MAX = 36
const LERP = 0.15
const PUSH_DIST = 0.65

/**
 * Một vệt mềm theo con trỏ: vị trí hiển thị lerp theo chuột + trail canvas.
 */
export default function CursorSmoothTrail() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return window.matchMedia('(pointer: fine)').matches
  })
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0, active: false })
  const followRef = useRef({ x: 0, y: 0 })
  const trailRef = useRef([])
  const initedRef = useRef(false)

  useEffect(() => {
    if (!enabled) return undefined

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

    const onMove = (e) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
      targetRef.current.active = true
      if (!initedRef.current) {
        followRef.current.x = e.clientX
        followRef.current.y = e.clientY
        initedRef.current = true
      }
    }

    const onLeave = () => {
      targetRef.current.active = false
    }

    resize()
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('blur', onLeave)
    document.addEventListener('mouseleave', onLeave)

    const tick = () => {
      const ww = w()
      const hh = h()
      const dark = document.documentElement.classList.contains('dark')
      const { active } = targetRef.current
      const tx = targetRef.current.x
      const ty = targetRef.current.y
      let { x: fx, y: fy } = followRef.current

      const trail = trailRef.current

      if (active) {
        fx += (tx - fx) * LERP
        fy += (ty - fy) * LERP
        followRef.current = { x: fx, y: fy }

        const last = trail[trail.length - 1]
        if (!last || Math.hypot(fx - last.x, fy - last.y) >= PUSH_DIST) {
          trail.push({ x: fx, y: fy })
          while (trail.length > TRAIL_MAX) trail.shift()
        } else {
          trail[trail.length - 1] = { x: fx, y: fy }
        }
      } else if (trail.length > 0) {
        trail.shift()
        if (trail.length === 0) initedRef.current = false
      }

      ctx.clearRect(0, 0, ww, hh)
      if (trail.length < 2) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      /* Nền sáng: vệt đen · nền tối: vệt trắng */
      const cCore = dark ? '255, 255, 255' : '0, 0, 0'
      const cGlow = dark ? '228, 228, 235' : '45, 45, 52'

      for (let i = 0; i < trail.length; i++) {
        const t = trail.length > 1 ? i / (trail.length - 1) : 1
        const p = trail[i]
        const radius = 5 + t * 20
        const alpha = 0.07 + t * 0.42
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius)
        g.addColorStop(0, `rgba(${cCore}, ${alpha * 0.95})`)
        g.addColorStop(0.45, `rgba(${cGlow}, ${alpha * 0.35})`)
        g.addColorStop(1, `rgba(${cCore}, 0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.save()
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      for (let i = 1; i < trail.length; i++) {
        const t = i / (trail.length - 1)
        const a = 0.05 + t * 0.32
        ctx.strokeStyle = `rgba(${cCore}, ${a})`
        ctx.lineWidth = 2 + t * 10
        ctx.beginPath()
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
        ctx.lineTo(trail[i].x, trail[i].y)
        ctx.stroke()
      }
      ctx.restore()

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('blur', onLeave)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[85]"
      aria-hidden
    />
  )
}
