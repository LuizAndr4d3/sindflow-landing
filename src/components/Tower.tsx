import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../lib/ease'

/**
 * Assinatura visual do site: uma torre de condomínio em line-art,
 * vista à noite. Cada janela que acende é uma parte da gestão sob
 * controle; as linhas conectam a torre aos eventos do painel.
 */

const COLS = [106, 146, 186, 226]
const ROWS = [92, 140, 188, 236, 284, 332, 380, 428]

/** Índices [col, row] das janelas acesas, em ordem de acendimento. */
const LIT: Array<[number, number]> = [
  [3, 1],
  [1, 3],
  [3, 3],
  [0, 2],
  [2, 5],
  [3, 6],
  [1, 6],
  [0, 5],
  [2, 0],
  [1, 1],
]

const CHIPS = [
  { x: 258, y: 96, w: 178, label: 'Alerta: AVCB a vencer', from: [248, 152], dot: '#609DFF' },
  { x: 272, y: 226, w: 156, label: 'Contrato renovado', from: [248, 248], dot: '#3C6FD6' },
  { x: 264, y: 356, w: 158, label: 'Manutenção em dia', from: [248, 392], dot: '#609DFF' },
] as const

export function Tower() {
  const reduce = useReducedMotion()
  const litSet = new Set(LIT.map(([c, r]) => `${c}-${r}`))

  return (
    <motion.svg
      viewBox="0 0 440 540"
      className="h-auto w-full max-w-[26rem]"
      role="img"
      aria-label="Ilustração de uma torre de condomínio à noite com janelas acesas conectadas a eventos do painel SindFlow"
      initial={reduce ? false : 'hidden'}
      animate="show"
    >
      <defs>
        <filter id="windowGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id="towerFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(22,41,74,0.55)" />
          <stop offset="1" stopColor="rgba(16,35,63,0.15)" />
        </linearGradient>
      </defs>

      {/* silhuetas vizinhas */}
      <rect x="30" y="240" width="60" height="260" fill="none" stroke="rgba(96,157,255,0.14)" strokeWidth="1" />
      <rect x="260" y="330" width="60" height="170" fill="none" stroke="rgba(96,157,255,0.10)" strokeWidth="1" />

      {/* torre principal */}
      <motion.rect
        x="90"
        y="70"
        width="170"
        height="430"
        fill="url(#towerFill)"
        stroke="rgba(96,157,255,0.45)"
        strokeWidth="1.4"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8 } } }}
      />
      {/* antena */}
      <line x1="175" y1="70" x2="175" y2="42" stroke="rgba(96,157,255,0.45)" strokeWidth="1.4" />
      <circle cx="175" cy="38" r="3" fill="#609DFF" opacity="0.9">
        {!reduce && (
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="3s" repeatCount="indefinite" />
        )}
      </circle>

      {/* entrada */}
      <rect x="158" y="462" width="35" height="38" fill="rgba(60,111,214,0.35)" stroke="rgba(96,157,255,0.35)" strokeWidth="1" />

      {/* janelas */}
      {COLS.map((cx, ci) =>
        ROWS.map((ry, ri) => {
          const key = `${ci}-${ri}`
          const litIndex = LIT.findIndex(([c, r]) => c === ci && r === ri)
          const isLit = litSet.has(key)
          if (!isLit) {
            return (
              <rect
                key={key}
                x={cx}
                y={ry}
                width="22"
                height="25"
                fill="rgba(96,157,255,0.06)"
                stroke="rgba(96,157,255,0.16)"
                strokeWidth="0.8"
              />
            )
          }
          return (
            <g key={key}>
              <motion.rect
                x={cx}
                y={ry}
                width="22"
                height="25"
                fill="#609DFF"
                filter="url(#windowGlow)"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 0.5,
                    transition: { delay: 0.5 + litIndex * 0.18, duration: 0.4 },
                  },
                }}
              />
              <motion.rect
                x={cx}
                y={ry}
                width="22"
                height="25"
                fill="#9CC2FF"
                className={litIndex % 3 === 1 ? 'window-flicker' : undefined}
                style={litIndex % 3 === 1 ? { animationDelay: `${4.5 + litIndex * 0.9}s` } : undefined}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 0.92,
                    transition: { delay: 0.5 + litIndex * 0.18, duration: 0.4 },
                  },
                }}
              />
            </g>
          )
        }),
      )}

      {/* conexões e chips de eventos */}
      {CHIPS.map((chip, i) => (
        <motion.g
          key={chip.label}
          variants={{
            hidden: { opacity: 0, x: 12 },
            show: {
              opacity: 1,
              x: 0,
              transition: { delay: 2.3 + i * 0.25, duration: 0.6, ease: EASE },
            },
          }}
        >
          <line
            x1={chip.from[0]}
            y1={chip.from[1]}
            x2={chip.x + 4}
            y2={chip.y + 17}
            stroke="rgba(96,157,255,0.35)"
            strokeWidth="1"
          />
          <circle cx={chip.from[0]} cy={chip.from[1]} r="2.5" fill="#609DFF" />
          <rect
            x={chip.x}
            y={chip.y}
            width={chip.w}
            height="34"
            rx="17"
            fill="rgba(22,41,74,0.85)"
            stroke="rgba(96,157,255,0.25)"
            strokeWidth="1"
          />
          <circle cx={chip.x + 18} cy={chip.y + 17} r="3.5" fill={chip.dot} />
          <text
            x={chip.x + 30}
            y={chip.y + 21}
            fontFamily="'JetBrains Mono', monospace"
            fontSize="10.5"
            fill="#EAF0F8"
            letterSpacing="0.02em"
          >
            {chip.label}
          </text>
        </motion.g>
      ))}

      {/* linha do chão */}
      <line x1="16" y1="500" x2="424" y2="500" stroke="rgba(96,157,255,0.25)" strokeWidth="1" />
    </motion.svg>
  )
}
