import { Nav } from './components/Nav'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { CtaFinal } from './sections/CtaFinal'
import { Diferenciais } from './sections/Diferenciais'
import { Hero } from './sections/Hero'
import { Planos } from './sections/Planos'
import { Problema } from './sections/Problema'
import { Solucao } from './sections/Solucao'

function App() {
  useSmoothScroll()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problema />
        <Solucao />
        <Diferenciais />
        <Planos />
        <CtaFinal />
      </main>
    </>
  )
}

export default App
