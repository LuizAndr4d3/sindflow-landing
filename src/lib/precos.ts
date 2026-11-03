import { DESCONTO_ANUAL } from '../config/planos'

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

/** "R$ 79,99", como o Intl devolve. */
export const formatarPreco = (valor: number) => moeda.format(valor)

/** Sem o espaço depois do "R$": o formato dos preços grandes dos cards ("R$79,99"). */
export const formatarPrecoCompacto = (valor: number) => moeda.format(valor).replace(/\s/g, '')

export const PERCENTUAL_DESCONTO = Math.round(DESCONTO_ANUAL * 100)

/**
 * Plano anual calculado a partir do preço mensal e do DESCONTO_ANUAL. A conta é
 * feita em centavos para não acumular erro de ponto flutuante. Primeiro sai o
 * valor por mês (arredondado) e o total é ele x 12, para que "R$ 67,99/mês" e
 * "1x de R$ 815,88" sempre batam entre si.
 */
export function precoAnual(mensal: number) {
  const centavosPorMes = Math.round(Math.round(mensal * 100) * (1 - DESCONTO_ANUAL))
  return { porMes: centavosPorMes / 100, total: (centavosPorMes * 12) / 100 }
}
