import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE } from '../lib/ease'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
}

const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
}

const word = {
  hidden: { opacity: 0, y: '0.6em' },
  show: { opacity: 1, y: '0em', transition: { duration: 0.55, ease: EASE } },
}

const NBSP = ' '

export function SectionHeading({ eyebrow, title, lead, align = 'left' }: SectionHeadingProps) {
  const reduce = useReducedMotion()
  const alignCls = align === 'center' ? 'text-center mx-auto' : ''

  const renderTitle = () => {
    if (typeof title !== 'string') return title
    const words = title.split(' ')
    return (
      <motion.span
        variants={wordContainer}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        aria-label={title}
      >
        {words.map((w, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden pb-[0.08em] align-bottom"
            aria-hidden="true"
          >
            <motion.span variants={word} className="inline-block will-change-transform">
              {i < words.length - 1 ? w + NBSP : w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    )
  }

  return (
    <Reveal className={`max-w-3xl ${alignCls}`} y={0}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-medium leading-[1.12] tracking-tight text-ink sm:text-5xl">
        {renderTitle()}
      </h2>
      {lead ? <p className="mt-5 text-base leading-relaxed text-steel sm:text-lg">{lead}</p> : null}
    </Reveal>
  )
}
