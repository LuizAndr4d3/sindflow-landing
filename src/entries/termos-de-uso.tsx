import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { TermosDeUsoPage } from '../pages/TermosDeUsoPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TermosDeUsoPage />
  </StrictMode>,
)
