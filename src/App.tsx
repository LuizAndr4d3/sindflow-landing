import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { Nav } from './components/Nav'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { EVENTO_ABRIR_FORMULARIO, type PedidoFormulario } from './lib/formulario'
import { Hero } from './sections/Hero'

const carregarRestante = () => import('./sections/Restante')
const Restante = lazy(carregarRestante)
const Rodape = lazy(() => carregarRestante().then((m) => ({ default: m.Rodape })))
// só baixa o formulário quando alguém clica em um plano
const FormularioInteresse = lazy(() => import('./components/FormularioInteresse'))

function FormularioHost() {
  const [pedido, setPedido] = useState<(PedidoFormulario & { id: number }) | null>(null)

  useEffect(() => {
    const abrir = (e: Event) => {
      const detalhe = (e as CustomEvent<PedidoFormulario>).detail ?? {}
      setPedido({ ...detalhe, id: Date.now() })
    }
    window.addEventListener(EVENTO_ABRIR_FORMULARIO, abrir)
    return () => window.removeEventListener(EVENTO_ABRIR_FORMULARIO, abrir)
  }, [])

  const fechar = useCallback(() => setPedido(null), [])

  if (!pedido) return null
  return (
    <Suspense fallback={null}>
      <FormularioInteresse key={pedido.id} planoInicial={pedido.plano} onClose={fechar} />
    </Suspense>
  )
}

function App() {
  useSmoothScroll()

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-full bg-azure px-5 py-3 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="conteudo">
        <Hero />
        <Suspense fallback={null}>
          <Restante />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Rodape />
      </Suspense>
      <FormularioHost />
    </>
  )
}

export default App
