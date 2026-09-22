import { useRef, type ReactNode } from 'react'

type SpotCardProps = {
  children: ReactNode
  className?: string
  /** Inclina o card em 3D seguindo o cursor (usar com moderação). */
  tilt?: boolean
}

/**
 * Card com spotlight que segue o cursor e tilt 3D opcional.
 * Manipula CSS vars direto no DOM (sem re-render) e anima apenas
 * transform/opacity.
 */
export function SpotCard({ children, className = '', tilt = false }: SpotCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    if (tilt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rx = ((y / rect.height - 0.5) * -5).toFixed(2)
      const ry = ((x / rect.width - 0.5) * 5).toFixed(2)
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
    }
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    if (tilt) el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spot-card group relative ${className}`}
      style={tilt ? { transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)' } : undefined}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(96, 157, 255, 0.13), transparent 65%)',
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
