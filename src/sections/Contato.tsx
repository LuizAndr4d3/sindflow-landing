import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SpotCard } from '../components/SpotCard'
import {
  EMAIL,
  MENSAGEM_GERAL,
  NOVA_ABA,
  WHATSAPP_EXIBICAO,
  whatsappLink,
} from '../config/contato'

const canais = [
  {
    icon: MessageCircle,
    rotulo: 'WhatsApp',
    valor: WHATSAPP_EXIBICAO,
    href: whatsappLink(MENSAGEM_GERAL),
    externo: true,
  },
  {
    icon: Mail,
    rotulo: 'E-mail',
    valor: EMAIL,
    href: `mailto:${EMAIL}`,
    externo: false,
  },
]

export function Contato() {
  return (
    <section id="contato" className="border-t border-[rgba(96,157,255,0.14)] py-24 sm:py-32">
      <div className="mx-auto grid max-w-wrap gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contato"
            title="Vamos conversar?"
            lead="Agende uma demonstração gratuita de 20 minutos e veja o SindFlow funcionando no seu condomínio."
          />
          <Reveal className="mt-9" delay={0.1}>
            <Button href={whatsappLink(MENSAGEM_GERAL)} {...NOVA_ABA}>
              Agendar demonstração
            </Button>
          </Reveal>
        </div>

        <ul className="grid gap-4">
          {canais.map((canal, i) => (
            <li key={canal.rotulo}>
              <Reveal delay={0.1 + i * 0.08}>
                <SpotCard className="rounded-2xl border border-[rgba(96,157,255,0.14)] bg-navy/40 transition-colors duration-300 hover:border-[rgba(96,157,255,0.3)]">
                  <a
                    href={canal.href}
                    {...(canal.externo ? NOVA_ABA : {})}
                    className="flex items-center gap-5 rounded-2xl p-6"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface/80 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                      <canal.icon className="h-5 w-5 text-sky" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="eyebrow block text-steel">{canal.rotulo}</span>
                      <span className="mt-1.5 block break-words font-display text-lg font-medium text-ink sm:text-2xl">
                        {canal.valor}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="hidden h-5 w-5 shrink-0 text-steel transition-colors duration-200 group-hover:text-sky sm:block"
                      aria-hidden="true"
                    />
                  </a>
                </SpotCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
