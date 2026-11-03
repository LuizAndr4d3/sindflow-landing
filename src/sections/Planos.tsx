import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useId, useState } from 'react'
import { Button } from '../components/Button'
import { RedeDeFundo } from '../components/RedeDeFundo'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SpotCard } from '../components/SpotCard'
import { FaixaTesteGratis } from '../components/TesteGratis'
import { MENSAGEM_ASSESSORIA, NOVA_ABA, whatsappLink } from '../config/contato'
import {
  DIAS_TESTE_GRATIS,
  MOSTRAR_ANUAL,
  MOSTRAR_PREMIUM,
  MOSTRAR_TESTE_GRATIS,
  PERIODO_PADRAO,
} from '../config/planos'
import { EASE } from '../lib/ease'
import { abrirFormulario } from '../lib/formulario'
import {
  PERCENTUAL_DESCONTO,
  formatarPreco,
  formatarPrecoCompacto,
  precoAnual,
} from '../lib/precos'
import { BlocoDiagnostico, BlocoOrcamento, EM_PAR } from './PlanosDestaques'

type Periodo = typeof PERIODO_PADRAO

type Plano = {
  nome: string
  tagline: string
  publico: string
  itens: string[]
  /** Preço mensal em reais (79.99). Sem ele, o card mostra `sobConsulta` no lugar. */
  preco?: number
  sobConsulta?: string
  destaque?: boolean
  assessoria?: boolean
}

const planos: Plano[] = [
  {
    nome: 'Lite',
    preco: 79.99,
    tagline: 'Organize sua rotina.',
    publico: 'Síndicos que querem começar pela própria operação',
    itens: [
      'Agenda e alertas',
      'Equipamentos e manutenção',
      'Obrigações legais',
      'Serviços e checklists',
      'Gestão de documentos',
    ],
  },
  {
    nome: 'Pro',
    preco: 179.99,
    tagline: 'Conecte moradores e condomínio.',
    publico: 'Condomínios que querem um canal oficial com os moradores',
    itens: [
      'Tudo do Lite',
      'App para os moradores',
      'Comunicados oficiais',
      'Solicitações registradas',
    ],
    destaque: true,
  },
  {
    nome: 'Max',
    preco: 249.99,
    tagline: 'Controle as finanças.',
    publico: 'Condomínios com gestão financeira própria',
    itens: [
      'Tudo do Pro',
      'Controle de Finanças',
      'Emissão de boletos',
      'Contratos e prestadores',
      'Previsão orçamentária',
    ],
  },
]

const premium: Plano = {
  nome: 'Premium',
  sobConsulta: 'Sob medida',
  tagline: 'Inteligência financeira.',
  publico: 'Assessoria contábil e financeira, com valor sob medida',
  itens: [
    'Tudo do Max',
    'Receitas, despesas e fluxo de caixa',
    'Orçado x realizado mês a mês',
    'Relatório mensal assinado',
    'Documento para o conselho e a assembleia',
  ],
  assessoria: true,
}

const planosVisiveis = MOSTRAR_PREMIUM ? [...planos, premium] : planos

const condicoes = [
  ...(MOSTRAR_TESTE_GRATIS ? [`${DIAS_TESTE_GRATIS} dias grátis`] : []),
  'Sem fidelidade',
  'Sem taxa de adesão',
  'Implantação e treinamento inclusos',
  'Moradores ilimitados',
]

function estiloCard(plano: Plano) {
  if (plano.destaque) {
    return 'glass border border-sky/60 shadow-[0_18px_60px_rgba(60,111,214,0.28)]'
  }
  return 'border border-[rgba(96,157,255,0.14)] bg-navy/40 hover:border-[rgba(96,157,255,0.4)] hover:shadow-[0_14px_44px_rgba(60,111,214,0.18)]'
}

const etiquetaDesconto =
  'rounded-full border border-sky/50 bg-azure/15 px-2 py-1 font-mono text-[0.625rem] font-medium uppercase leading-none tracking-[0.14em] text-sky'

/** Interruptor Mensal/Anual. Os rótulos também trocam com o mouse; no teclado, o interruptor faz tudo. */
function SeletorPeriodo({ periodo, onChange }: { periodo: Periodo; onChange: (p: Periodo) => void }) {
  const id = useId()
  const reduce = useReducedMotion()
  const anual = periodo === 'anual'
  const rotulo = (ativo: boolean) =>
    `cursor-pointer select-none text-sm font-medium transition-colors duration-200 ${
      ativo ? 'text-ink' : 'text-steel hover:text-ink'
    }`

  return (
    <div className="flex items-center justify-center gap-3">
      <span className={rotulo(!anual)} onClick={() => onChange('mensal')}>
        Mensal
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={anual}
        aria-labelledby={`${id}-anual`}
        aria-describedby={`${id}-desconto`}
        onClick={() => onChange(anual ? 'mensal' : 'anual')}
        className={`relative h-7 w-[3.25rem] shrink-0 rounded-full border transition-colors duration-300 ${
          anual
            ? 'border-sky/60 bg-azure/30'
            : 'border-[rgba(96,157,255,0.3)] bg-surface hover:border-sky/60'
        }`}
      >
        <motion.span
          className="absolute left-[3px] top-[3px] h-5 w-5 rounded-full bg-sky shadow-[0_0_12px_rgba(96,157,255,0.55)]"
          initial={false}
          animate={{ x: anual ? 24 : 0 }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 34 }}
        />
      </button>
      <span id={`${id}-anual`} className={rotulo(anual)} onClick={() => onChange('anual')}>
        Anual
      </span>
      <span id={`${id}-desconto`} className={etiquetaDesconto}>
        {PERCENTUAL_DESCONTO}% OFF
      </span>
    </div>
  )
}

export function Planos() {
  const [periodo, setPeriodo] = useState<Periodo>(MOSTRAR_ANUAL ? PERIODO_PADRAO : 'mensal')
  const anual = MOSTRAR_ANUAL && periodo === 'anual'
  const reduce = useReducedMotion()
  // fade curto quando os valores trocam; sem animação para quem pediu menos movimento
  const troca = {
    initial: reduce ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.25, ease: EASE },
  } as const

  return (
    <section id="planos" className="relative border-t border-[rgba(96,157,255,0.14)] py-24 sm:py-32">
      <RedeDeFundo />
      <div className="relative mx-auto max-w-wrap px-5 sm:px-8">
        <SectionHeading
          eyebrow="Planos"
          title="Uma jornada de evolução."
          lead="Comece pelo plano que resolve o seu momento e evolua quando quiser, sem trocar de ferramenta. No Premium, um contador acompanha as finanças do condomínio com você, todo mês."
        />

        {MOSTRAR_ANUAL ? (
          <Reveal className="mt-12">
            <SeletorPeriodo periodo={periodo} onChange={setPeriodo} />
            {/* avisa o leitor de tela que os valores dos cards mudaram */}
            <p className="sr-only" aria-live="polite">
              {anual
                ? `Preços do plano anual, com ${PERCENTUAL_DESCONTO}% de desconto.`
                : 'Preços do plano mensal.'}
            </p>
          </Reveal>
        ) : null}

        <div
          className={`mt-14 grid gap-5 md:grid-cols-2 ${
            MOSTRAR_PREMIUM ? 'xl:grid-cols-4' : 'lg:grid-cols-3'
          }`}
        >
          {planosVisiveis.map((plano, i) => {
            const doAno = anual && plano.preco ? precoAnual(plano.preco) : null
            return (
              <Reveal
                key={plano.nome}
                delay={i * 0.08}
                className={
                  plano.destaque
                    ? `order-first md:order-none ${MOSTRAR_PREMIUM ? 'xl:-mt-4' : 'lg:-mt-4'}`
                    : ''
                }
              >
                <SpotCard
                  tilt
                  className={`flex h-full flex-col rounded-2xl transition-colors duration-300 ${estiloCard(plano)}`}
                >
                  <article className="relative flex h-full flex-col p-7">
                    {plano.destaque ? (
                      <span className="absolute -top-3 left-7 rounded-full bg-azure px-3 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-white">
                        Mais escolhido
                      </span>
                    ) : null}

                    {/* h-5 com o anual ligado: a etiqueta de desconto não pode mudar a altura da linha */}
                    <div
                      className={`flex items-center justify-between gap-3 ${MOSTRAR_ANUAL ? 'h-5' : ''}`}
                    >
                      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-sky">
                        {plano.nome}
                      </h3>
                      {doAno && plano.preco ? (
                        <motion.p key="desconto" {...troca} className="flex items-center gap-2">
                          <s className="whitespace-nowrap text-xs text-steel">
                            <span className="sr-only">De </span>
                            {formatarPreco(plano.preco)}
                          </s>
                          <span className={etiquetaDesconto}>{PERCENTUAL_DESCONTO}% OFF</span>
                        </motion.p>
                      ) : null}
                    </div>

                    <p className="mt-4">
                      {/* nowrap: "Sob medida" ocupa quase toda a largura do card em 4 colunas */}
                      <motion.span
                        key={plano.preco ? periodo : 'fixo'}
                        {...(plano.preco ? troca : {})}
                        className="whitespace-nowrap font-display text-4xl font-semibold text-ink"
                      >
                        {plano.preco
                          ? formatarPrecoCompacto(doAno ? doAno.porMes : plano.preco)
                          : plano.sobConsulta}
                      </motion.span>
                      {plano.preco ? <span className="text-sm text-steel">/mês</span> : null}
                    </p>

                    {/* linha do pagamento anual: reservada também no mensal (e no Premium)
                        para os cards não mudarem de altura ao trocar o período. Em 4 colunas
                        "1x de R$ 2.549,88" não cabe em 12px, então ali desce para 11px */}
                    {MOSTRAR_ANUAL ? (
                      <p
                        className={`mt-1 h-4 whitespace-nowrap text-xs leading-4 text-steel ${
                          MOSTRAR_PREMIUM ? 'xl:text-[0.6875rem]' : ''
                        }`}
                      >
                        {doAno ? (
                          <motion.span key="anual" {...troca}>
                            Pagamento anual: 1x de {formatarPreco(doAno.total)}
                          </motion.span>
                        ) : null}
                      </p>
                    ) : null}

                    {/* Em 4 colunas a frase do Pro vai para 2 linhas; reservar 2 linhas em
                        todos mantém a divisória e a lista alinhadas entre os cards */}
                    <p
                      className={`mt-3 font-display text-lg font-medium italic leading-snug text-ink ${
                        MOSTRAR_PREMIUM ? 'xl:min-h-[2.75em]' : ''
                      }`}
                    >
                      {plano.tagline}
                    </p>

                    <p className="mt-2 min-h-[2.4375rem] text-xs leading-relaxed text-steel">
                      {plano.publico}
                    </p>

                    <div className="mt-6 border-t border-[rgba(96,157,255,0.14)] pt-6">
                      <ul className="flex flex-col gap-3">
                        {plano.itens.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-steel"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-8">
                      {plano.assessoria ? (
                        // !px-5: em 4 colunas "Falar com especialista" não cabe no px-7 padrão
                        // do Button (que vence na ordem do CSS) e quebraria em 2 linhas
                        <Button
                          href={whatsappLink(MENSAGEM_ASSESSORIA)}
                          {...NOVA_ABA}
                          className="w-full whitespace-nowrap !px-5"
                        >
                          Falar com especialista
                        </Button>
                      ) : (
                        // Abre o formulário de interesse já com este plano marcado
                        <Button
                          href="#contratar"
                          role="button"
                          className="w-full"
                          onClick={(e) => {
                            e.preventDefault()
                            abrirFormulario(plano.nome)
                          }}
                        >
                          Começar agora
                        </Button>
                      )}
                    </div>
                  </article>
                </SpotCard>
              </Reveal>
            )
          })}
        </div>

        {MOSTRAR_TESTE_GRATIS ? (
          <Reveal className="mt-12">
            <FaixaTesteGratis />
          </Reveal>
        ) : null}

        <Reveal className={MOSTRAR_TESTE_GRATIS ? 'mt-8' : 'mt-14'}>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {condicoes.map((condicao) => (
              <li
                key={condicao}
                className="flex items-center gap-2 rounded-full border border-[rgba(96,157,255,0.2)] bg-surface/40 px-4 py-2 text-sm text-ink"
              >
                <Check className="h-4 w-4 shrink-0 text-sky" aria-hidden="true" />
                {condicao}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-xs text-steel [text-wrap:balance]">
            {anual
              ? 'Plano anual com pagamento único. No plano mensal, sem fidelidade. Pagamento por boleto ou Pix.'
              : 'Pagamento por boleto ou Pix.'}
          </p>
          {/* Com o Premium visível, o próprio card já faz o papel desta linha */}
          {MOSTRAR_PREMIUM ? null : (
            <p className="mt-2 text-center text-xs text-steel [text-wrap:balance]">
              Precisa também de{' '}
              <strong className="font-semibold text-flow-texto">assessoria contábil e financeira</strong>?{' '}
              <a
                href={whatsappLink(MENSAGEM_ASSESSORIA)}
                {...NOVA_ABA}
                className="underline decoration-steel/40 underline-offset-[3px] transition-colors duration-200 hover:text-sky hover:decoration-sky"
              >
                Consulte nosso plano com assessoria
              </a>
              . Valores sob consulta.
            </p>
          )}
        </Reveal>

        {/* gap-y-0: as linhas da grade passam por dentro dos blocos (subgrid), e o
            espaço entre elas apareceria entre o título e a divisória */}
        <div className={`mt-10 grid gap-5 ${MOSTRAR_PREMIUM ? 'lg:grid-cols-2 lg:gap-y-0' : ''}`}>
          <Reveal className={`h-full ${MOSTRAR_PREMIUM ? EM_PAR : ''}`}>
            <BlocoOrcamento sozinho={!MOSTRAR_PREMIUM} />
          </Reveal>
          {MOSTRAR_PREMIUM ? (
            <Reveal className={`h-full ${EM_PAR}`} delay={0.08}>
              <BlocoDiagnostico />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
