import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, Calculator, LayoutGrid } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../components/Button'
import { Magnetic } from '../components/Magnetic'
import { SpotCard } from '../components/SpotCard'
import { MENSAGEM_DIAGNOSTICO, NOVA_ABA, whatsappLink } from '../config/contato'
import { EASE } from '../lib/ease'

/**
 * Lado a lado, cada bloco e seus invólucros repassam as linhas da grade de fora
 * (subgrid): a parte de cima dos dois blocos ocupa a mesma linha, e a de baixo
 * também, então as divisórias ficam na mesma altura qualquer que seja o texto.
 * Use no Reveal que envolve cada bloco.
 */
export const EM_PAR = 'lg:row-span-2 lg:grid lg:grid-rows-subgrid'

const divisoria = 'border-[rgba(96,157,255,0.14)]'

/**
 * Parte de baixo de cada bloco (a partir da divisória). Empilhado, o mt-auto a
 * leva para a base; em par, o lg:mt-0 a deixa esticar pela linha da subgrid
 * (com margem automática ela desceria e a divisória sairia do alinhamento).
 */
const PARTE_DE_BAIXO = 'mt-auto flex flex-col pt-8 lg:mt-0'

/** Moldura comum aos dois blocos: vidro, brilho no canto e luz que segue o cursor. */
function Painel({ emPar, children }: { emPar: boolean; children: ReactNode }) {
  const subgrade = emPar ? EM_PAR : ''
  return (
    <SpotCard
      className={`glass h-full overflow-hidden rounded-2xl border border-sky/30 transition-colors duration-300 hover:border-sky/50 ${subgrade}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 100% 0%, rgba(60,111,214,0.28), transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div className={`relative flex h-full flex-col p-7 lg:p-9 ${subgrade}`}>{children}</div>
    </SpotCard>
  )
}

/* ------------------------------------------------------------------ */
/* Ilustração 1: prédio de 16 apartamentos, janelas acendendo uma a uma */

const COLUNAS = [18.5, 30.5, 42.5, 54.5]
const ANDARES = [17, 32, 47, 62]

const predio = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }
const janela = {
  hidden: { opacity: 0 },
  show: { opacity: 0.92, transition: { duration: 0.35, ease: EASE } },
}

function PredioMini({ className }: { className: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.svg
      viewBox="0 0 80 100"
      className={className}
      variants={predio}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      aria-hidden="true"
    >
      <line x1="40" y1="10" x2="40" y2="3" stroke="rgba(96,157,255,0.5)" strokeWidth="1.2" />
      <circle cx="40" cy="2.5" r="1.6" fill="#609DFF" />
      <rect
        x="12"
        y="10"
        width="56"
        height="84"
        fill="rgba(22,41,74,0.55)"
        stroke="rgba(96,157,255,0.5)"
        strokeWidth="1.2"
      />
      {ANDARES.map((y) =>
        COLUNAS.map((x) => (
          <g key={`${x}-${y}`}>
            <rect
              x={x}
              y={y}
              width="7"
              height="9"
              fill="rgba(96,157,255,0.08)"
              stroke="rgba(96,157,255,0.22)"
              strokeWidth="0.7"
            />
            <motion.rect variants={janela} x={x} y={y} width="7" height="9" fill="#9CC2FF" />
          </g>
        )),
      )}
      <rect
        x="35"
        y="78"
        width="10"
        height="16"
        fill="rgba(60,111,214,0.45)"
        stroke="rgba(96,157,255,0.4)"
        strokeWidth="0.8"
      />
      <line x1="2" y1="94" x2="78" y2="94" stroke="rgba(96,157,255,0.35)" strokeWidth="1" />
    </motion.svg>
  )
}

/* ------------------------------------------------------------------ */
/* Ilustração 2: relatório assinado, desenhado ao entrar na tela         */

const relatorio = { hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } } }
const traco = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.7, ease: EASE } },
}
const barra = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.5, ease: EASE } },
}
const selo = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 16 } },
}
const azul = {
  fill: 'none',
  stroke: '#609DFF',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function RelatorioMini({ className }: { className: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.svg
      viewBox="0 0 80 100"
      className={className}
      variants={relatorio}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      aria-hidden="true"
    >
      <path
        d="M14 10 H52 L64 22 V88 H14 Z"
        fill="rgba(22,41,74,0.55)"
        stroke="rgba(96,157,255,0.5)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M52 10 V22 H64" fill="none" stroke="rgba(96,157,255,0.5)" strokeWidth="1.2" strokeLinejoin="round" />
      <motion.g variants={relatorio}>
        <motion.path variants={traco} d="M21 24 H44" {...azul} strokeWidth="1.6" opacity="0.7" />
        <motion.path variants={traco} d="M21 31 H50" {...azul} strokeWidth="1.2" opacity="0.45" />
      </motion.g>
      <motion.g variants={relatorio}>
        {[
          [22, 60, 8],
          [31, 54, 14],
          [40, 57, 11],
          [49, 47, 21],
        ].map(([x, y, h]) => (
          <motion.rect
            key={x}
            variants={barra}
            x={x}
            y={y}
            width="6"
            height={h}
            rx="1"
            fill="#3C6FD6"
            style={{ transformBox: 'fill-box', originY: 1 }}
          />
        ))}
      </motion.g>
      <motion.path variants={traco} d="M21 76 C25 70 28 80 32 74 S38 72 41 76" {...azul} strokeWidth="1.4" />
      <motion.g variants={selo} style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.5 }}>
        <circle cx="62" cy="80" r="11" fill="#16294A" stroke="#609DFF" strokeWidth="1.4" />
        <path d="M57 80 L60.5 83.5 L67 76.5" {...azul} strokeWidth="1.8" />
      </motion.g>
    </motion.svg>
  )
}

/* ------------------------------------------------------------------ */

const ilustracao = 'h-20 w-16 shrink-0 sm:h-24 sm:w-[4.75rem]'

function Topo({
  etiqueta,
  titulo,
  ilustracao,
  children,
}: {
  etiqueta: string
  titulo: string
  ilustracao: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="eyebrow">{etiqueta}</p>
          <h3 className="mt-3 font-display text-2xl font-medium leading-tight text-ink sm:text-3xl">
            {titulo}
          </h3>
        </div>
        {ilustracao}
      </div>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-steel sm:text-base">{children}</p>
    </div>
  )
}

const faixa = { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } } }
const unidade = {
  hidden: { opacity: 0.15, scaleY: 0.4 },
  show: { opacity: 1, scaleY: 1, transition: { duration: 0.4, ease: EASE } },
}

/** Os 16 apartamentos da conta, acendendo um a um: a mensalidade dividida entre eles. */
function Unidades() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="mt-5 grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1.5"
      variants={faixa}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      aria-hidden="true"
    >
      {Array.from({ length: 16 }, (_, i) => (
        <motion.span
          key={i}
          variants={unidade}
          className="h-2.5 rounded-sm bg-gradient-to-b from-sky/80 to-azure/60"
        />
      ))}
    </motion.div>
  )
}

const conta = [
  ['Plano Lite', 'R$ 79,99/mês'],
  ['Apartamentos', '16'],
]

/**
 * Custo por apartamento no Lite. `sozinho`: ocupa a largura toda (Premium
 * desligado), com a conta ao lado do texto em vez de embaixo.
 */
export function BlocoOrcamento({ sozinho }: { sozinho: boolean }) {
  return (
    <Painel emPar={!sozinho}>
      <div
        className={
          sozinho
            ? 'flex h-full flex-col md:grid md:grid-cols-[1.25fr_1fr] md:items-center md:gap-12'
            : 'contents'
        }
      >
        <Topo
          etiqueta="Plano Lite"
          titulo="Cabe no orçamento do condomínio"
          ilustracao={<PredioMini className={ilustracao} />}
        >
          No plano Lite, um prédio de 16 apartamentos investe menos de R$&nbsp;5 por unidade ao mês.
        </Topo>

        <div className={sozinho ? '' : PARTE_DE_BAIXO}>
          <div
            className={`flex flex-1 flex-col border-t ${divisoria} pt-6 ${
              sozinho ? 'mt-8 md:mt-0 md:border-l md:border-t-0 md:pl-12 md:pt-0' : ''
            }`}
          >
            {/* a conta, como num recibo: preço do Lite dividido pelos apartamentos */}
            <dl className="flex flex-col gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
              {conta.map(([rotulo, valor]) => (
                <div key={rotulo} className="flex items-baseline gap-3">
                  <dt className="flex flex-1 items-baseline gap-3 text-steel">
                    {rotulo}
                    <span className="flex-1 border-b border-dotted border-[rgba(96,157,255,0.3)]" />
                  </dt>
                  <dd className="text-ink">{valor}</dd>
                </div>
              ))}
            </dl>
            <Unidades />
            {/* o total desce para a base; a sobra de espaço fica entre os itens e o total */}
            <div className="mt-auto pt-5">
              <div className="mb-5 border-t border-dashed border-[rgba(96,157,255,0.25)]" />
              <p className="flex flex-wrap items-end gap-x-3 gap-y-1">
                <span>
                  <span className="block text-xs text-steel">menos de</span>
                  <span className="font-display text-5xl font-semibold leading-none tracking-tight text-sky sm:text-6xl">
                    R$&nbsp;5
                  </span>
                </span>
                <span className="pb-1 text-sm leading-snug text-steel">
                  por apartamento
                  <br />
                  ao mês
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Painel>
  )
}

const pilares = [
  { icon: LayoutGrid, texto: 'Gestão que organiza.' },
  { icon: Calculator, texto: 'Contabilidade que explica.' },
  { icon: BadgeCheck, texto: 'Transparência que comprova.' },
]

/** Porta de entrada do Premium: diagnóstico gratuito pelo WhatsApp. */
export function BlocoDiagnostico() {
  return (
    <Painel emPar>
      <Topo
        etiqueta="Premium"
        titulo="Comece com um diagnóstico gratuito"
        ilustracao={<RelatorioMini className={ilustracao} />}
      >
        Analisamos a saúde financeira do seu condomínio e apresentamos os pontos de atenção em uma
        reunião. Acompanhamento todo mês, e não só na assembleia.
      </Topo>

      <div className={PARTE_DE_BAIXO}>
        <div className={`flex flex-1 flex-col border-t ${divisoria} pt-6`}>
          <ul className="flex flex-col gap-3">
            {pilares.map((pilar) => (
              <li key={pilar.texto} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface/80 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                  <pilar.icon className="h-4 w-4 text-sky" aria-hidden="true" />
                </span>
                <span className="font-display text-base italic text-steel sm:text-lg">
                  {pilar.texto}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-7">
            <Magnetic>
              <Button href={whatsappLink(MENSAGEM_DIAGNOSTICO)} {...NOVA_ABA}>
                Solicitar diagnóstico
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </Painel>
  )
}
