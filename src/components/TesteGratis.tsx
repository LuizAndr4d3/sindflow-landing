import { Gift } from 'lucide-react'
import { DIAS_TESTE_GRATIS } from '../config/planos'
import { SpotCard } from './SpotCard'

/** Faixa larga dos planos, logo abaixo dos cards. Só aparece com MOSTRAR_TESTE_GRATIS. */
export function FaixaTesteGratis() {
  return (
    <SpotCard className="glass overflow-hidden rounded-2xl border border-sky/40 shadow-[0_18px_60px_rgba(60,111,214,0.16)] transition-colors duration-300 hover:border-sky/60">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 140% at 50% 0%, rgba(60,111,214,0.26), transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center gap-4 px-6 py-7 text-center sm:flex-row sm:justify-center sm:gap-5 sm:px-10 sm:text-left">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-azure/20 ring-1 ring-sky/40 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105">
          <Gift className="h-6 w-6 text-sky" aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-xl font-medium leading-snug text-ink [text-wrap:balance] sm:text-2xl">
            Teste grátis por{' '}
            <span className="whitespace-nowrap text-sky">{DIAS_TESTE_GRATIS} dias</span>, com todos
            os recursos do plano Max.
          </p>
          <p className="mt-1.5 text-sm text-steel">Sem cartão no cadastro.</p>
        </div>
      </div>
    </SpotCard>
  )
}

/** Etiqueta pequena da seção final, acima dos botões. */
export function EtiquetaTesteGratis({ className = '' }: { className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-sky/40 bg-azure/15 px-4 py-1.5 text-sm font-medium text-ink ${className}`}
    >
      <Gift className="h-4 w-4 shrink-0 text-sky" aria-hidden="true" />
      Teste grátis por {DIAS_TESTE_GRATIS} dias
    </p>
  )
}
