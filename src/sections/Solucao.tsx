import { Banknote, Bell, FileText, MessageSquare, Wrench } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SpotCard } from '../components/SpotCard'

const frentes = [
  {
    icon: MessageSquare,
    title: 'Comunicação',
    text: 'Comunicados, avisos e solicitações em um canal único entre síndico e moradores.',
  },
  {
    icon: FileText,
    title: 'Gestão Documental',
    text: 'Atas, contratos, AVCB, ART, licenças e notas fiscais organizados e fáceis de encontrar.',
  },
  {
    icon: Bell,
    title: 'Agenda de Obrigações',
    text: 'Prazos legais e vencimentos com alertas automáticos, antes de virarem problema.',
  },
  {
    icon: Wrench,
    title: 'Operação e Equipamentos',
    text: 'Manutenções, checklists e equipamentos com histórico e responsáveis definidos.',
  },
  {
    icon: Banknote,
    title: 'Financeiro opcional',
    text: 'Controle financeiro completo para quem trabalha com ou sem administradora.',
  },
]

const modulos = [
  'Dashboard',
  'Alertas',
  'Agendas',
  'Equipamentos',
  'Mandatórios Legais',
  'Serviços',
  'Checklist',
  'Moradores',
  'Comunicações',
  'Solicitações e Ocorrências',
  'Contratos',
  'Financeiro',
]

export function Solucao() {
  return (
    <section id="solucao" className="border-t border-[rgba(96,157,255,0.14)] py-24 sm:py-32">
      <div className="mx-auto max-w-wrap px-5 sm:px-8">
        <SectionHeading
          eyebrow="A solução"
          title="Toda a rotina do condomínio em um só ambiente."
          lead="O SindFlow centraliza toda a rotina administrativa em um único ambiente, no navegador ou no celular, sem app de loja."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {frentes.map((frente, i) => (
            <Reveal key={frente.title} delay={i * 0.08}>
              <SpotCard className="h-full rounded-2xl border border-[rgba(96,157,255,0.14)] bg-navy/40 transition-colors duration-300 hover:border-[rgba(96,157,255,0.3)]">
                <article className="p-7">
                  <frente.icon
                    className="h-6 w-6 text-sky transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 font-display text-xl font-medium text-ink">{frente.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel">{frente.text}</p>
                </article>
              </SpotCard>
            </Reveal>
          ))}

          <Reveal delay={0.4}>
            <div className="relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-sky/30 bg-navy/40 p-7">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 90% 80% at 90% 0%, rgba(60,111,214,0.3), transparent 65%)',
                }}
                aria-hidden="true"
              />
              <p className="relative">
                <span className="block font-display text-7xl font-semibold leading-none tracking-tight text-sky">
                  12
                </span>{' '}
                <span className="mt-3 block text-sm leading-relaxed text-steel">
                  módulos prontos para usar hoje.
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <p className="eyebrow">Os 12 módulos</p>
          <div className="marquee-mask mt-5 overflow-hidden" aria-label={modulos.join(', ')}>
            <div className="marquee-track flex gap-2.5">
              {[...modulos, ...modulos].map((mod, i) => (
                <span
                  key={`${mod}-${i}`}
                  aria-hidden={i >= modulos.length}
                  className="whitespace-nowrap rounded-full border border-[rgba(96,157,255,0.2)] bg-surface/40 px-4 py-2 font-mono text-xs text-ink transition-colors duration-200 hover:border-sky hover:bg-surface/70"
                >
                  {mod}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
