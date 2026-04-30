/**
 * Nền ambient: mesh gradient mềm, chuyển động chậm + hạt rất mờ ở giữa.
 */
export default function AmbientDotsBackground() {
  return (
    <div
      className="ambient-dots-root pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="ambient-dots-base" />
      <div className="ambient-dots-glow" />
      <div className="ambient-dots-glow2" />
      <div className="ambient-dots-fine" />
      <div className="ambient-dots-edge" />
    </div>
  )
}
