import { Button } from '../components/Button'
import { Magnetic } from '../components/Magnetic'
import { Reveal } from '../components/Reveal'

export function CtaFinal() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-[rgba(96,157,255,0.14)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 110%, rgba(60,111,214,0.22), transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-wrap px-5 py-28 text-center sm:px-8 sm:py-36">
        <Reveal>
          <p className="eyebrow">Comece hoje</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">
            Leve o condomínio para um só lugar.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-steel sm:text-lg">
            Acesse o painel e conheça a plataforma que já está em produção, ou fale com o
            time para entender qual plano faz sentido para o seu condomínio.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Button href="https://app.sindflow.com.br">Acessar o painel</Button>
            </Magnetic>
            <Button href="https://sindflow.com.br" variant="ghost">
              Falar com o time
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
