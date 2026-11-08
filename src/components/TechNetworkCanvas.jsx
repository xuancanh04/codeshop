import { useEffect, useRef, useState } from 'react'

function shouldRun() {
  if (typeof window === 'undefined') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Hiệu ứng Canvas hạt công nghệ (Cyber tech particles with interconnecting web lines).
 * Khi di chuột hoặc tương tác, các hạt phát sáng và kết nối với nhau bằng dải laser mạng lưới.
 */
export default function TechNetworkCanvas() {
  const canvasRef = useRef(null)
  const [active] = useState(() => shouldRun())

  useEffect(() => {
    if (!active) return undefined
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const mouse = { x: -1000, y: -1000, radius: 160 }

    // Số lượng hạt theo độ rộng màn hình
    const particleCount = width < 768 ? 40 : 80
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        baseColor: i % 3 === 0 ? '56, 189, 248' : i % 3 === 1 ? '99, 102, 241' : '34, 211, 238',
      })
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      const isDark = document.documentElement.classList.contains('dark')

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Di chuyển
        p.x += p.vx
        p.y += p.vy

        // Phản xạ biên
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Tương tác chuột: đẩy nhẹ hạt khi chuột lại gần
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          p.x -= (dx / dist) * force * 3
          p.y -= (dy / dist) * force * 3
        }

        // Vẽ hạt
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.baseColor}, ${isDark ? 0.65 : 0.45})`
        ctx.shadowBlur = isDark ? 8 : 4
        ctx.shadowColor = `rgba(${p.baseColor}, 0.8)`
        ctx.fill()
        ctx.shadowBlur = 0

        // Kết nối các hạt gần nhau
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const distance = Math.hypot(p.x - p2.x, p.y - p2.y)
          const maxDistance = width < 768 ? 90 : 130

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * (isDark ? 0.22 : 0.12)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${p.baseColor}, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-[8] opacity-80"
      aria-hidden
    />
  )
}
