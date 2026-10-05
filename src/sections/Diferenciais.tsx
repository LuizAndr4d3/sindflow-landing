import { Layers, MessageCircle, ShieldCheck, Smartphone } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SpotCard } from '../components/SpotCard'

const diferenciais = [
  {
    icon: Smartphone,
    title: 'Vira app no celular',
    text: 'Instala direto do navegador em Android e iOS, como um aplicativo normal, sem precisar baixar nada em loja de apps.',
  },
  {
    icon: MessageCircle,
    title: 'Avisos pelo WhatsApp',
    text: 'Os avisos importantes chegam onde todo mundo já olha todos os dias: o WhatsApp.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança por padrão',
    text: 'Os dados de cada condomínio ficam totalmente separados e protegidos, e os documentos só aparecem para quem tem permissão de ver.',
  },
  {
    icon: Layers,
    title: 'Solução completa e acessível',
    text: 'Financeiro, comunicação e operação em uma só ferramenta, com preço que cabe no condomínio.',
  },
]

export function Diferenciais() {
  return (
    <section className="border-t border-[rgba(96,157,255,0.14)] py-24 sm:py-32">
      <div className="mx-auto max-w-wrap px-5 sm:px-8">
        <SectionHeading
          eyebrow="Diferenciais"
          title="O que só o SindFlow entrega."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {diferenciais.map((dif, i) => (
            <Reveal key={dif.title} delay={i * 0.08}>
              <SpotCard className="h-full rounded-2xl border border-[rgba(96,157,255,0.14)] bg-navy/40 transition-colors duration-300 hover:border-[rgba(96,157,255,0.3)]">
                <article className="flex gap-5 p-7">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface/80 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                    <dif.icon className="h-5 w-5 text-sky" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium text-ink">{dif.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel">{dif.text}</p>
                  </div>
                </article>
              </SpotCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-2xl border border-[rgba(96,157,255,0.1)] px-7 py-6">
            <p className="eyebrow text-steel">Próximos passos</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-steel/80">
              Em estudo para versões futuras: inteligência artificial para apoiar as decisões
              do síndico, novos recursos financeiros e integração com câmeras. São evoluções
              planejadas, ainda não disponíveis no produto.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
