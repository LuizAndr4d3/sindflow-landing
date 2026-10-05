import { useEffect } from 'react'
import { Footer } from '../components/Footer'
import { Contato } from './Contato'
import { CtaFinal } from './CtaFinal'
import { Diferenciais } from './Diferenciais'
import { Planos } from './Planos'
import { Problema } from './Problema'
import { Solucao } from './Solucao'

/**
 * Tudo que fica abaixo da primeira dobra. Fica num arquivo separado para que a
 * primeira pintura monte só o menu e o hero.
 */
export default function Restante() {
  // em links com âncora (ex.: sindflow.com.br/#planos) a seção só passa a existir agora
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <Problema />
      <Solucao />
      <Diferenciais />
      <Planos />
      <Contato />
      <CtaFinal />
    </>
  )
}

export { Footer as Rodape }
