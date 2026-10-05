import { Button } from '../components/Button'
import { Constellation } from '../components/Constellation'
import { Magnetic } from '../components/Magnetic'
import { Reveal } from '../components/Reveal'
import { APP, MENSAGEM_GERAL, NOVA_ABA, whatsappLink } from '../config/contato'

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden border-t border-[rgba(96,157,255,0.14)]">
      <div className="brilho-divisa-cima pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* eco da rede do hero: aparece nas bordas e some no centro, para não competir com o texto */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          maskImage: 'radial-gradient(ellipse 42% 60% at 50% 45%, transparent 35%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 42% 60% at 50% 45%, transparent 35%, black 100%)',
        }}
        aria-hidden="true"
      >
        <Constellation className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-wrap px-5 py-28 text-center sm:px-8 sm:py-36">
        <Reveal>
          <p className="eyebrow">Comece hoje</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">
            Leve o condomínio para um só lugar.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-steel sm:text-lg">
            Agende uma demonstração gratuita de 20 minutos ou fale com o time para entender qual
            plano faz sentido para o seu condomínio.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Button href={whatsappLink(MENSAGEM_GERAL)} {...NOVA_ABA}>
                Agendar demonstração
              </Button>
            </Magnetic>
            <Button href={APP} variant="ghost">
              Acessar o painel
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
