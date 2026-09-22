import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { Button } from '../components/Button'
import { Constellation } from '../components/Constellation'
import { Magnetic } from '../components/Magnetic'
import { Tower } from '../components/Tower'
import { EASE } from '../lib/ease'

gsap.registerPlugin(ScrollTrigger)

const TITLE = 'SindFlow'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

const letter = {
  hidden: { opacity: 0, y: 46, rotateX: -40 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: EASE } },
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const towerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(towerRef.current, {
        yPercent: -9,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to(contentRef.current, {
        yPercent: 12,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom 30%',
          scrub: true,
        },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-glow-radial pt-28 sm:pt-24"
    >
      <Constellation className="pointer-events-none absolute inset-0 h-full w-full" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(rgba(96,157,255,0.14) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 60% 40%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 60% 40%, black, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-wrap items-center gap-14 px-5 pb-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <motion.div
          ref={contentRef}
          variants={container}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="will-change-transform"
        >
          <motion.p variants={item} className="eyebrow flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden="true" />
            <span>Em produção · sindflow.com.br · v1.0</span>
          </motion.p>

          <h1
            className="mt-6 font-display text-[clamp(3.75rem,10vw,7rem)] font-semibold leading-none tracking-tight text-ink [perspective:600px]"
            aria-label={TITLE}
          >
            {TITLE.split('').map((ch, i) => (
              <motion.span
                key={i}
                variants={letter}
                className="inline-block will-change-transform"
                aria-hidden="true"
              >
                {ch}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={item}
            className="mt-4 font-display text-xl font-medium text-sky sm:text-2xl"
          >
            Gestão Condominial <em className="italic">Inteligente</em>
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-steel sm:text-lg">
            Mais do que administrar condomínios: ajudamos o síndico a decidir, cumprir
            obrigações legais e organizar toda a operação em um só lugar.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button href="#solucao">Conhecer a plataforma</Button>
            </Magnetic>
            <Button href="#contato" variant="ghost">
              Falar com o time
            </Button>
          </motion.div>

          <motion.p variants={item} className="mt-10 font-mono text-xs tracking-[0.14em] text-steel/80">
            10 MÓDULOS &nbsp;·&nbsp; VIRA APP NO CELULAR &nbsp;·&nbsp; AVISOS NO WHATSAPP
          </motion.p>
        </motion.div>

        <div ref={towerRef} className="mx-auto hidden w-full max-w-[26rem] will-change-transform md:block">
          <Tower />
        </div>
      </div>

      {/* indicador de scroll */}
      <motion.div
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-steel/70">Role</span>
        <span className="relative block h-9 w-px overflow-hidden bg-[rgba(96,157,255,0.15)]">
          <span className="scroll-line absolute inset-0 bg-sky" />
        </span>
      </motion.div>
    </section>
  )
}
