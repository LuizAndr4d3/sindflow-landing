import { useEffect, useState } from 'react'
import {
  APP_LOGIN,
  EMAIL,
  MENSAGEM_GERAL,
  NOVA_ABA,
  SITE,
  WHATSAPP_EXIBICAO,
  whatsappLink,
} from '../config/contato'
import { LogoMark, Wordmark } from './Logo'

const link =
  'inline-block py-2.5 text-steel transition-colors duration-200 hover:text-sky md:py-0'

export function Footer() {
  const [ano, setAno] = useState(__ANO_BUILD__)
  useEffect(() => setAno(new Date().getFullYear()), [])

  return (
    <footer className="relative overflow-hidden border-t border-[rgba(96,157,255,0.14)]">
      <div className="brilho-divisa-baixo pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-wrap px-5 py-10 sm:px-8">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <div className="text-left">
              <Wordmark className="block text-lg leading-tight" />
              <p className="text-xs text-steel">Gestão Condominial Inteligente</p>
            </div>
          </div>

          <ul className="flex flex-col items-center text-sm md:flex-row md:gap-6">
            <li>
              <a href={whatsappLink(MENSAGEM_GERAL)} {...NOVA_ABA} className={link}>
                WhatsApp {WHATSAPP_EXIBICAO}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={link}>
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={APP_LOGIN} className={`font-mono text-xs ${link}`}>
                {SITE.replace('https://', '')}
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-8 border-t border-[rgba(96,157,255,0.1)] pt-6 text-center text-xs text-steel/80 md:text-left">
          © {ano} SindFlow. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
