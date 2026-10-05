import { Check } from 'lucide-react'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SpotCard } from '../components/SpotCard'
import { MENSAGEM_ASSESSORIA, NOVA_ABA, whatsappLink } from '../config/contato'
import { abrirFormulario } from '../lib/formulario'

type Plano = {
  nome: string
  preco: string
  tagline: string
  publico: string
  itens: string[]
  destaque?: boolean
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
      'Financeiro completo',
      'Emissão de boletos',
      'Contratos e prestadores',
      'Previsão orçamentária',
    ],
  },
]

const condicoes = [
  'Sem fidelidade',
  'Sem taxa de adesão',
  'Implantação e treinamento inclusos',
  'Moradores ilimitados',
]

export function Planos() {
  return (
    <section id="planos" className="border-t border-[rgba(96,157,255,0.14)] py-24 sm:py-32">
      <div className="mx-auto max-w-wrap px-5 sm:px-8">
        <SectionHeading
          eyebrow="Planos"
          title="Uma jornada de evolução."
          lead="Hoje o SindFlow já nasce com potencial para evoluir além de um software de gestão. Comece pelo plano que resolve o seu momento e cresça sem trocar de ferramenta."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {planos.map((plano, i) => (
            <Reveal
              key={plano.nome}
              delay={i * 0.08}
              className={plano.destaque ? 'order-first md:order-none lg:-mt-4' : ''}
            >
              <SpotCard
                tilt
                className={`flex h-full flex-col rounded-2xl transition-colors duration-300 ${
                  plano.destaque
                    ? 'glass border border-sky/60 shadow-[0_18px_60px_rgba(60,111,214,0.28)]'
                    : 'border border-[rgba(96,157,255,0.14)] bg-navy/40 hover:border-[rgba(96,157,255,0.4)] hover:shadow-[0_14px_44px_rgba(60,111,214,0.18)]'
                }`}
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
                    <span className="font-display text-4xl font-semibold text-ink">
                      {plano.preco}
                    </span>
                    <span className="text-sm text-steel">/mês</span>
                  </p>

                  <p className="mt-3 font-display text-lg font-medium italic leading-snug text-ink">
                    {plano.tagline}
                  </p>

                  <p className="mt-2 min-h-[2.4375rem] text-xs leading-relaxed text-steel">
                    {plano.publico}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3 border-t border-[rgba(96,157,255,0.14)] pt-6">
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

                  <div className="mt-auto pt-8">
                    {/* Abre o formulário de interesse já com este plano marcado */}
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
          <p className="mt-2 text-center text-xs text-steel [text-wrap:balance]">
            Precisa também de{' '}
            <strong className="font-semibold text-flow-texto">assessoria contábil e gerencial</strong>?{' '}
            <a
              href={whatsappLink(MENSAGEM_ASSESSORIA)}
              {...NOVA_ABA}
              className="underline decoration-steel/40 underline-offset-[3px] transition-colors duration-200 hover:text-sky hover:decoration-sky"
            >
              Consulte nosso plano com assessoria
            </a>
            . Valores sob consulta.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="glass flex flex-col gap-3 rounded-2xl border border-sky/30 p-7 sm:p-9 md:flex-row md:items-center md:justify-between md:gap-10">
            <h3 className="font-display text-2xl font-medium leading-tight text-ink sm:text-3xl">
              Cabe no orçamento do condomínio
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-steel sm:text-base">
              No plano Lite, um prédio de 16 apartamentos investe menos de R$&nbsp;5 por unidade
              ao mês.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
