/** Agenda trabalho não essencial para depois da primeira pintura. Devolve um cancelador. */
export function quandoOcioso(fn: () => void, limiteMs = 1500) {
  // o Safari não tem requestIdleCallback, mesmo os tipos do DOM dizendo que sim
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(fn, { timeout: limiteMs })
    return () => window.cancelIdleCallback(id)
  }
  const id = setTimeout(fn, 200)
  return () => clearTimeout(id)
}
