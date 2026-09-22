import { motion, useReducedMotion } from 'framer-motion'
import { EyeOff, FolderOpen, TrendingDown } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SpotCard } from '../components/SpotCard'
import { EASE } from '../lib/ease'

const cards = [
  {
    icon: FolderOpen,
    title: 'Informação espalhada',
    text: 'Financeiro em planilha, comunicados no WhatsApp, contratos na gaveta e manutenções na memória do síndico.',
  },
  {
    icon: EyeOff,
    title: 'Falta de transparência',
    text: 'O morador não enxerga para onde vai o dinheiro nem o andamento das solicitações.',
  },
  {
    icon: TrendingDown,
    title: 'Inadimplência no escuro',
    text: 'Contratos e manutenções vencendo sem aviso, com a inadimplência condominial em 11,95%.',
  },
]

const FECHO_A = 'O problema não é administrar o condomínio.'
const FECHO_B = 'É apoiar quem administra.'

const quoteContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const quoteWord = {
  hidden: { opacity: 0.12 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
}

export function Problema() {
  const reduce = useReducedMotion()

  return (
    <section id="problema" className="border-t border-[rgba(96,157,255,0.14)] py-24 sm:py-32">
      <div className="mx-auto max-w-wrap px-5 sm:px-8">
        <SectionHeading eyebrow="O problema" title="Ser síndico nunca foi tão complexo." />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <SpotCard className="h-full rounded-2xl border border-[rgba(96,157,255,0.14)] bg-navy/40 transition-colors duration-300 hover:border-[rgba(96,157,255,0.3)]">
                <article className="p-7">
                  <card.icon
                    className="h-6 w-6 text-sky transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 font-display text-xl font-medium text-ink">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel">{card.text}</p>
                </article>
              </SpotCard>
            </Reveal>
          ))}
        </div>

        <motion.p
          className="mx-auto mt-20 max-w-2xl text-center font-display text-2xl font-medium italic leading-snug text-ink sm:text-3xl"
          variants={quoteContainer}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {FECHO_A.split(' ').map((w, i) => (
            <motion.span key={`a-${i}`} variants={quoteWord} className="inline-block">
              {w}&nbsp;
            </motion.span>
          ))}
          {FECHO_B.split(' ').map((w, i) => (
            <motion.span key={`b-${i}`} variants={quoteWord} className="inline-block text-sky">
              {w}&nbsp;
            </motion.span>
          ))}
        </motion.p>
      </div>
    </section>
  )
}
