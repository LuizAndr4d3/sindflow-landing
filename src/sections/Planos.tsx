import { Check } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SpotCard } from '../components/SpotCard'

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
      'Agenda e alertas automáticos',
      'Equipamentos e manutenção',
      'Mandatórios legais',
      'Serviços e checklists',
      'Sem app para moradores',
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
      'Comunicados do síndico',
      'Solicitações e ocorrências',
      'Cadastro de moradores',
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
      'Módulo financeiro completo',
      'Emissão de boletos',
      'Gestão de contratos',
      'Base de prestadores CAZA Simples',
    ],
  },
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
                    <span className="absolute -top-3 left-7 rounded-full bg-azure px-3 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-ink">
                      Recomendado
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

                  <a
                    href="https://app.sindflow.com.br"
                    className={`mt-auto pt-7 text-center text-sm font-medium transition-colors duration-200 ${
                      plano.destaque ? 'text-sky hover:text-ink' : 'text-steel hover:text-sky'
                    }`}
                  >
                    Começar agora
                  </a>
                </article>
              </SpotCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
