import { useEffect } from 'react'
import { quandoOcioso } from '../lib/ocioso'

/**
 * Scroll suave com Lenis, sincronizado com o ScrollTrigger do GSAP.
 * Carregado só depois da primeira pintura, porque não é necessário para o
 * conteúdo aparecer. Desativado quando o usuário prefere movimento reduzido.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelado = false
    let encerrar = () => {}

    const cancelarAgendamento = quandoOcioso(async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('../lib/gsap'),
      ])
      if (cancelado) return

      const lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: { offset: -80 },
      })
      lenis.on('scroll', ScrollTrigger.update)

      const raf = (time: number) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      encerrar = () => {
        gsap.ticker.remove(raf)
        lenis.destroy()
      }
    })

    return () => {
      cancelado = true
      cancelarAgendamento()
      encerrar()
    }
  }, [])
}
