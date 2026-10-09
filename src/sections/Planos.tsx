import { Check } from 'lucide-react'
import { Button } from '../components/Button'
import { RedeDeFundo } from '../components/RedeDeFundo'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SpotCard } from '../components/SpotCard'
import { MENSAGEM_ASSESSORIA, NOVA_ABA, whatsappLink } from '../config/contato'
import { MOSTRAR_PREMIUM } from '../config/planos'
import { abrirFormulario } from '../lib/formulario'
import { BlocoDiagnostico, BlocoOrcamento, EM_PAR } from './PlanosDestaques'

type Plano = {
  nome: string
  tagline: string
  publico: string
  itens: string[]
  /** Preço mensal. Sem ele, o card mostra `sobConsulta` no lugar. */
  preco?: string
  sobConsulta?: string
  destaque?: boolean
  assessoria?: boolean
}

const planos: Plano[] = [
  {
    nome: 'Lite',
    preco: 'R$79,99',
    tagline: 'Organize sua rotina.',
    publico: 'Síndicos que querem começar pela própria operação',
    itens: [
      'Agenda e alertas',
      'Equipamentos e manutenção',
      'Obrigações legais',
      'Serviços e checklists',
    ],
  },
  {
    nome: 'Pro',
    preco: 'R$179,99',
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
    preco: 'R$249,99',
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

export function Planos() {
  return (
    <section id="planos" className="relative border-t border-[rgba(96,157,255,0.14)] py-24 sm:py-32">
      <RedeDeFundo />
      <div className="relative mx-auto max-w-wrap px-5 sm:px-8">
        <SectionHeading
          eyebrow="Planos"
          title="Uma jornada de evolução."
          lead="Comece pelo plano que resolve o seu momento e evolua quando quiser, sem trocar de ferramenta. No Premium, um contador acompanha as finanças do condomínio com você, todo mês."
        />

        <div
          className={`mt-14 grid gap-5 md:grid-cols-2 ${
            MOSTRAR_PREMIUM ? 'xl:grid-cols-4' : 'lg:grid-cols-3'
          }`}
        >
          {planosVisiveis.map((plano, i) => (
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

                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-sky">
                    {plano.nome}
                  </h3>

                  <p className="mt-4">
                    {/* nowrap: "Sob medida" ocupa quase toda a largura do card em 4 colunas */}
                    <span className="whitespace-nowrap font-display text-4xl font-semibold text-ink">
                      {plano.preco ?? plano.sobConsulta}
                    </span>
                    {plano.preco ? <span className="text-sm text-steel">/mês</span> : null}
                  </p>

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
          ))}
        </div>

        <Reveal className="mt-14">
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
          <p className="mt-4 text-center text-xs text-steel">Pagamento por boleto ou Pix.</p>
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
