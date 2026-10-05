import { motion, useReducedMotion } from 'framer-motion'
import { Fragment, useEffect, useRef } from 'react'
import { Button } from '../components/Button'
import { Constellation } from '../components/Constellation'
import { Magnetic } from '../components/Magnetic'
import { Tower } from '../components/Tower'
import { MENSAGEM_GERAL, NOVA_ABA, whatsappLink } from '../config/contato'
import { EASE } from '../lib/ease'
import { quandoOcioso } from '../lib/ocioso'

const TITULO = 'Quer uma gestão mais leve?'
const LINHA_1 = ['Quer', 'uma', 'gestão']
const LINHA_2 = ['mais', 'leve?']
const DESTAQUES = ['12 MÓDULOS', 'VIRA APP NO CELULAR', 'AVISOS NO WHATSAPP']

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const titulo = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

const palavra = {
  hidden: { opacity: 0, y: 46, rotateX: -40 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: EASE } },
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const towerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    let cancelado = false
    let reverter = () => {}

    const cancelarAgendamento = quandoOcioso(async () => {
      const { gsap } = await import('../lib/gsap')
      if (cancelado) return
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
      reverter = () => mm.revert()
    })

    return () => {
      cancelado = true
      cancelarAgendamento()
      reverter()
    }
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
            <span>Você, síndico!</span>
          </motion.p>

          <motion.h1
            variants={titulo}
            className="mt-6 font-display text-[clamp(2.5rem,1.5rem+3.3vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-ink [perspective:600px]"
          >
            <span className="sr-only">{TITULO}</span>
            <span aria-hidden="true">
              {LINHA_1.map((p) => (
                <Fragment key={p}>
                  <motion.span variants={palavra} className="inline-block will-change-transform">
                    {p}
                  </motion.span>{' '}
                </Fragment>
              ))}
              <span className="text-sky md:block">
                {LINHA_2.map((p, i) => (
                  <Fragment key={p}>
                    {i > 0 ? ' ' : null}
                    <motion.span variants={palavra} className="inline-block will-change-transform">
                      {p}
                    </motion.span>
                  </Fragment>
                ))}
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 font-display text-xl font-medium text-ink [text-wrap:balance] sm:text-2xl"
          >
            Conheça o SindFlow, a gestão condominial <em className="italic">inteligente</em>.
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-steel sm:text-lg">
            Mais do que administrar condomínios: ajudamos o síndico a decidir, cumprir
            obrigações legais e organizar toda a operação em um só lugar.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button href={whatsappLink(MENSAGEM_GERAL)} {...NOVA_ABA}>
                Agendar demonstração
              </Button>
            </Magnetic>
            <Button href="#solucao" variant="ghost">
              Conhecer a plataforma
            </Button>
          </motion.div>

          {/* o separador de cada item fica à esquerda dele e é cortado quando o item
              abre uma linha nova, então nenhuma linha termina ou começa com "·" */}
          <motion.div variants={item} className="mt-10 overflow-hidden">
            <ul className="-ml-11 flex flex-wrap font-mono text-xs tracking-[0.14em] text-steel/80">
              {DESTAQUES.map((d) => (
                <li
                  key={d}
                  className="whitespace-nowrap before:inline-block before:w-11 before:text-center before:content-['·']"
                >
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
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
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-steel">Role</span>
        <span className="relative block h-9 w-px overflow-hidden bg-[rgba(96,157,255,0.15)]">
          <span className="scroll-line absolute inset-0 bg-sky" />
        </span>
      </motion.div>
    </section>
  )
}
