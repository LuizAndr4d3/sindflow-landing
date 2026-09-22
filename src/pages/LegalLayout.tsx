import type { ReactNode } from 'react'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'
import { Reveal } from '../components/Reveal'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

type LegalLayoutProps = {
  eyebrow: string
  title: string
  updatedAt: string
  children: ReactNode
}

/** Estrutura compartilhada pelas páginas de Termos de Uso e Política de Privacidade. */
export function LegalLayout({ eyebrow, title, updatedAt, children }: LegalLayoutProps) {
  useSmoothScroll()

  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden pb-24 pt-36 sm:pb-32 sm:pt-40">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: 'radial-gradient(rgba(96,157,255,0.14) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
              maskImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent)',
            }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-wrap px-5 sm:px-8">
            <Reveal>
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-sm text-steel/70">Última atualização em {updatedAt}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="prose-legal mt-14 max-w-3xl">{children}</div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
