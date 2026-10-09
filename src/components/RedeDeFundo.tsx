import { Constellation } from './Constellation'

type Foco = 'direita' | 'esquerda'

// onde a rede aparece; no resto da faixa ela some aos poucos
const MASCARAS: Record<Foco, string> = {
  direita: 'radial-gradient(ellipse 58% 90% at 90% 25%, black 25%, transparent 75%)',
  esquerda: 'radial-gradient(ellipse 58% 90% at 10% 25%, black 25%, transparent 75%)',
}

/**
 * Versão discreta da rede do hero para o alto das seções. Fica numa faixa no
 * topo (e não na seção inteira) para o canvas continuar pequeno, e a máscara a
 * concentra no lado vazio, longe do texto. Como só parte da faixa aparece, a
 * rede é mais densa que a do hero para não ficar rala. A seção precisa de
 * `relative`, e o conteúdo dela também, para ficar por cima.
 */
export function RedeDeFundo({ foco = 'direita' }: { foco?: Foco }) {
  const mascara = MASCARAS[foco]
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] opacity-55"
      style={{ maskImage: mascara, WebkitMaskImage: mascara }}
      aria-hidden="true"
    >
      <Constellation className="h-full w-full" densidade={11000} maximo={80} />
    </div>
  )
}
