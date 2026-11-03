import { useEffect, useState } from 'react'
import {
  APP_LOGIN,
  CNPJ,
  EMAIL,
  INSTAGRAM_URL,
  INSTAGRAM_USUARIO,
  MENSAGEM_GERAL,
  NOVA_ABA,
  RAZAO_SOCIAL,
  SITE,
  WHATSAPP_EXIBICAO,
  whatsappLink,
} from '../config/contato'
import { IconeInstagram } from './IconeInstagram'
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
              <a
                href={INSTAGRAM_URL}
                {...NOVA_ABA}
                aria-label={`Instagram ${INSTAGRAM_USUARIO}`}
                className={link}
              >
                {/* ícone em linha com o texto, para o @sindflow ficar na mesma altura dos outros links */}
                <IconeInstagram className="mr-1.5 inline-block h-4 w-4 align-[-0.1875rem]" aria-hidden="true" />
                {INSTAGRAM_USUARIO}
              </a>
            </li>
            <li>
              <a href={APP_LOGIN} className={`font-mono text-xs ${link}`}>
                {SITE.replace('https://', '')}
              </a>
            </li>
          </ul>
        </div>

        {/* nowrap no CNPJ: no celular a linha quebra entre as frases, nunca no meio do número */}
        <p className="mt-8 border-t border-[rgba(96,157,255,0.1)] pt-6 text-center text-xs text-steel [text-wrap:balance] md:text-left">
          © {ano} {RAZAO_SOCIAL}. <span className="whitespace-nowrap">CNPJ {CNPJ}.</span> Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  )
}
